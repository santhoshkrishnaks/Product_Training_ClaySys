const { app, BrowserWindow,Menu } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      contextIsolation: true,
    },
  });
  let indexPath = path.join(__dirname, 'dist', 'Dashboard', 'browser', 'index.html');

  if (!fs.existsSync(indexPath)) {
    indexPath = path.join(process.resourcesPath, 'dist', 'Dashboard', 'browser', 'index.html');
  }

  console.log('Loading index from:', indexPath);
  win.loadFile(indexPath);
   Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
