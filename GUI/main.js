'use strict'

if (require('electron-squirrel-startup')) return;

//////////
const path = require('path');
const url = require('url');
const fs = require('fs');
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
function createWindow() {
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
    pathname: path.join(__dirname, 'index.html'),
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
    }, 500);
  });
}

function foo(event) {
  event.preventDefault();
  window.webContents.send('close-app');
  window.setClosable(false);
}

//Start application
app.on('ready', createWindow);

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
  const rootAtomFolder = path.resolve(appFolder, '..');
  const driverPath = path.resolve(path.join(rootAtomFolder, 'app-1.0.0\\resources\\app\\driver_CH340\\CH341SER.inf'));
  const allStr = `start-process -verb runAs pnputil -ArgumentList "-i -a ${driverPath}"`;
  const ps = new PowerShell(allStr);
});


let docs;
let isOpen = false;

ipcMain.on('open-docs', () => {
  if(!isOpen) {
    isOpen = true;
    docs = new BrowserWindow({
      icon: __dirname + '/img/flash.png',
      width: 500,
      height: 500,
      resizable: false,
      minimizable : true,
      autoHideMenuBar: true,
      show: true,
      frame: true
    });

    docs.loadURL(url.format({
      pathname: path.join(__dirname, 'docs.html'),
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
