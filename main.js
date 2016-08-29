const {app, BrowserWindow} = require('electron');

const {Database} = require('sqlite3');

app.on('ready', () => {
  createWindow();
});

app.on('quit', () => {

});


function createWindow () {
  mainWindow = new BrowserWindow({});

  mainWindow.loadURL('http://baidu.com');


  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};


app.on('window-all-closed', () => app.quit());

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});