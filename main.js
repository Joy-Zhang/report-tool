var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;

var url = require('url');
var path = require('path');

var settings = require('./data/settings.json');

var profileChooser;
var reportTool;

app.on('ready', () => {
    profileChooser = new BrowserWindow({
        width: 640,
        height: 200,
        useContentSize: true,
        center: true,
        resizable: false,
        autoHideMenuBar: true
    });
    profileChooser.webContents.openDevTools();
    profileChooser.loadURL(url.format({
      protocol: 'file',
      slashes: true,
      pathname: require('path').join(__dirname, 'window/profileChooser.html')
    }));

});

ipcMain.on('profile', function (event, profile) {
    settings['profile'] = profile;
    profileChooser.hide();
    console.log(profile);
});
ipcMain.on('sizing', function (event, size) {
    profileChooser.setContentSize(640, size);
});


app.on('window-all-closed', function () {
    app.quit();
});