'use strict'

const path = require('path');
const url = require('url');
const fs = require('fs');
const {app, BrowserWindow, dialog, ipcMain} = require('electron');

let window;

//Window options
function createWindow() {
  window = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 1100,
    minHeight: 750,
    maxWidth: 1100,
    maxHeight: 750,
    resizable: false,
    minimizable : false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    },
   frame: true          //after debugging
  });

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  // window.webContents.openDevTools();   //after debugging

  //window.setAlwaysOnTop(true);
  // window.removeMenu();

  window.on('closed', () => {
    window = null;
  });

  window.once('close', foo);

  window.on('resize', () => {
    console.log('resize');
    // window.setSize(1100, 750);
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
