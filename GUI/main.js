'use strict'

const path = require('path');
const url = require('url');
const fs = require('fs');
const {app, BrowserWindow, dialog, ipcMain} = require('electron');

let window;

//Window options
function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 800,
    resizable: true,
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

  window.webContents.openDevTools();   //after debugging

  window.on('closed', () => {
    window = null;
  });
}

//Start application
app.on('ready', createWindow);

//Close application
app.on('window-all-closed', () => {
  app.quit();
});
