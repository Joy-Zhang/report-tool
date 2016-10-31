var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;

var url = require('url');
var path = require('path');

global['settings'] = require('./data/settings.json');

var profileChooser;
var reportTool;

app.on('ready', () => {
    profileChooser = new BrowserWindow({
        width: 640,
        height: 200,
        center: true,
        resizable: false,
        autoHideMenuBar: true
    });
    profileChooser.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, 'window/profileChooser.html')
    }));

});

ipcMain.on('profile', function (event, profile) {
    settings['profile'] = profile;

    reportTool = new BrowserWindow({
        center: true
    });
    reportTool.maximize();
    reportTool.webContents.openDevTools();
    reportTool.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, 'window/reportTool.html')
    }));

    profileChooser.close();
});

app.on('window-all-closed', function () {
    app.quit();
});