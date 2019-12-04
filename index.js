//*********************************//
//*** Argonia Electron Launcher ***//
//***         index.js          ***//
//*********************************//

const {app, BrowserWindow, ipcMain } = require('electron');
const ejse = require('ejs-electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require('electron-updater');

function initialize() {
    app.setName('vLauncher - Argonia');
    app.disableHardwareAcceleration();

    app.on('ready', () => {
      createWindow();
      autoUpdater.checkForUpdatesAndNotify();
    });

    app.on('window-all-closed', () => {
        if(process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if(frame === null) {
            createWindow();
        }
    });
}

function createWindow() {
    frame = new BrowserWindow({
      backgroundColor: '#D9B611',
      width: 1080,
      height: 720,
      minWidth: 1080,
      minHeight: 720,
      center: true,
      icon: getPlatformIcon('icon'),
      frame: false,
      webPreferences: {nodeIntegration: true}
    });

    frame.loadURL(url.format({
        pathname: path.join(__dirname, 'app', 'main.ejs'),
        protocol: 'file:',
        slashes: true
    }));

    frame.setMenu(null);
    frame.setResizable(false);

    frame.on('closed', () => {
        frame = null;
    });
}

function getPlatformIcon(file) {
    const os = process.platform;
    if(os === 'darwin') {
        file = file + '.icns';
    }
    else if(os === 'win32') {
        file = file + '.ico';
    }
    else {
        file = file + '.png';
    }
    return path.join(__dirname, 'app', 'assets', 'images', 'icons', file);
}

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

initialize();
