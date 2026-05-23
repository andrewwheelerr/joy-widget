const { app, BrowserWindow, ipcMain, screen, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.on('update-downloaded', () => {
  app.dock.setBadge('♪');
});

autoUpdater.on('error', (err) => {
  autoUpdater.logger.error('Update error:', err);
});

autoUpdater.on('update-available', () => {
  autoUpdater.logger.info('Update available, downloading...');
});

autoUpdater.on('update-not-available', () => {
  autoUpdater.logger.info('No update available.');
});


let buttonWin, overlayWin;

function createButtonWindow() {
  buttonWin = new BrowserWindow({
    width: 360,
    height: 160,
    frame: false,
    transparent: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  buttonWin.loadFile('button.html');
  buttonWin.setAlwaysOnTop(true, 'floating');
  buttonWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true, skipTransformProcessType: true });

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit Joy', click: () => app.quit() }
  ]);
  buttonWin.webContents.on('context-menu', () => contextMenu.popup());
}

function createOverlay(originX, originY) {
  const { width, height } = screen.getPrimaryDisplay().bounds;

  overlayWin = new BrowserWindow({
    x: 0,
    y: 0,
    width,
    height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  overlayWin.loadFile('overlay.html', { query: { ox: String(originX), oy: String(originY) } });
  overlayWin.setIgnoreMouseEvents(true);
  overlayWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  overlayWin.on('closed', () => { overlayWin = null; });
}

ipcMain.on('drag-move', (e, { x, y }) => {
  const [cx, cy] = buttonWin.getPosition();
  buttonWin.setPosition(cx + x, cy + y);
});

ipcMain.on('fire-joy', () => {
  app.dock.setBadge('');
  const [bx, by] = buttonWin.getPosition();
  const [bw, bh] = buttonWin.getSize();
  const ox = bx + bw / 2;
  const oy = by + bh / 2;
  if (overlayWin) {
    overlayWin.webContents.send('burst', { ox, oy });
  } else {
    createOverlay(ox, oy);
  }
});

ipcMain.on('overlay-done', () => {
  if (overlayWin) {
    overlayWin.close();
    overlayWin = null;
  }
});

app.whenReady().then(() => {
  createButtonWindow();
  setTimeout(() => app.dock.show(), 200);
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => app.quit());
