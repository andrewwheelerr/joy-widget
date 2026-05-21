const { app, BrowserWindow, ipcMain, screen, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

let buttonWin, overlayWin;

function createButtonWindow() {
  buttonWin = new BrowserWindow({
    width: 240,
    height: 110,
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
  buttonWin.webContents.on('did-finish-load', () => app.dock.show());

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
  app.dock.show();
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => app.quit());
