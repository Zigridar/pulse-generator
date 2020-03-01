'use strict'

if (require('electron-squirrel-startup')) return;

//////////
const path = require('path');
const url = require('url');
const fs = require('fs');
const process = require('process');
const PowerShell = require('powershell');
const ChildProcess = require('child_process');
const {app, BrowserWindow, dialog, ipcMain, shell} = require('electron');

/////////
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'pulse_generator_GUI.exe'));
  const exeName = path.basename(process.execPath);

  const driverPath = path.resolve(path.join(rootAtomFolder, 'app-1.0.0\\resources\\app\\driver_CH340\\CH341SER.inf'));
  const allStr = `start-process -verb runAs pnputil -ArgumentList "-i -a ${driverPath}"`;

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-firstrun':
      const ps = new PowerShell(allStr);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};
/////////

let window;

//Window options
function createWindow(config) {
  window = new BrowserWindow({
    icon: __dirname + '/img/flash.png',
    width: 1100,
    height: 730,
    resizable: false,
    minimizable : false,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    },
   frame: true
  });

  window.loadURL(url.format({
    pathname: path.join(__dirname, `index_${config.lang}.html`),
    protocol: 'file',
    slashes: true
  }));

  // window.removeMenu();

  window.on('closed', () => {
    window = null;
  });

  window.once('close', foo);

  window.once('ready-to-show', () => {
    setTimeout(function () {
      window.show();
      window.webContents.send('lang', config.lang);
    }, 500);
  });
}

function foo(event) {
  event.preventDefault();
  window.webContents.send('close-app');
  window.setClosable(false);
}

//read config
function readConfig() {
  return new Promise(ok => {

    const appFolder = path.resolve(process.execPath, '..');
    const configPath = path.resolve(appFolder, 'resources\\app\\config.json');

    // fs.readFile(configPath, (err, data) => {
    fs.readFile(path.resolve(__dirname, 'config.json'), (err, data) => {
    // fs.readFile(path.resolve(appPath, './resources/app/config.json'), (err, data) => {
      ok(JSON.parse(data));
    });
  });
}

//Start application
let language = ''
let os = ''

app.on('ready', async () => {
  const config = await readConfig();
  language = config.lang;
  console.log(config.lang);
  createWindow(config);
});

//Close application
app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('no-close', (event, data) => {
    window.once('close', foo);
    window.setClosable(true);
});

ipcMain.on('close-app', () => {
  window.setClosable(true);
  app.quit();
});


ipcMain.on('install-driver', () => {
  const appFolder = path.resolve(process.execPath, '..');
  const driverPath = path.resolve(appFolder, 'resources\\app\\driver_CH340\\CH341SER.inf');
  const allStr = `start-process -verb runAs pnputil -ArgumentList "-i -a ${driverPath}"`;
  const ps = new PowerShell(allStr);
});


let docs;
let isOpen = false;

ipcMain.on('open-docs', async () => {
  if(!isOpen) {
    isOpen = true;
    docs = new BrowserWindow({
      icon: __dirname + '/img/flash.png',
      width: 1000,
      height: 700,
      resizable: false,
      minimizable : true,
      autoHideMenuBar: true,
      show: true,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      },
      frame: true
    });

    docs.loadURL(url.format({
      pathname: path.join(__dirname, `docs_${language}.html`),
      protocol: 'file',
      slashes: true
    }));

    docs.once('closed', () => {
      isOpen = false;
    });
  }
  else {
    docs.focus();
  }
});

//change lang
ipcMain.on('changeLang', (e, lang) => {
  console.log('change lang: ' + lang);
  const appPath = path.resolve(process.execPath, `..`);
  // fs.readFile(path.join(appPath, `./resources/app/config.json`), (err, data) => {
  fs.readFile(path.resolve(__dirname, `config.json`), (err, data) => {
    console.log(err);
    let oldConf = JSON.parse(data);
    oldConf.lang = lang;
    language = lang;
    console.log(oldConf);
    let newConf = JSON.stringify(oldConf)
    // fs.writeFile(path.join(appPath, `./resources/app/config.json`), newConf, (err) => {
    fs.writeFile(path.resolve(__dirname, `config.json`), newConf, (err) => {
      // console.log(err);
      window.loadURL(url.format({
        pathname: path.join(__dirname, `index_${lang}.html`),
        protocol: 'file',
        slashes: true
      }));
      setTimeout(function () {
        window.webContents.send('lang', lang);
      }, 2000);
    });
  });
});
