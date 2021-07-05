import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as isDevAmbient from 'electron-is-dev';

let mainWindow: Electron.BrowserWindow | null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    minWidth: 1100,
    minHeight: 730,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
    },
  });

  mainWindow.setTitle('WaClone');
  mainWindow.on('page-title-updated', e => {
    e.preventDefault();
  });
  mainWindow.loadURL(
    isDevAmbient
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../build/index.html')}`,
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });

  ipcMain.handle('download', async (_, vcard: string) => {
    const selectedFile = await dialog.showSaveDialog({
      title: 'Selecione o caminho para salvar os contatos',
      buttonLabel: 'Salvar',
      filters: [
        {
          name: 'Contatos',
          extensions: ['vcf'],
        },
      ],
      properties: [],
    });

    if (!selectedFile.canceled) {
      fs.writeFile(selectedFile.filePath.toString(), vcard, err => {
        if (err) {
          throw err;
        }
      });
      return true;
    }
    return false;
  });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app
    .on('ready', createWindow)
    .whenReady()
    .then(() => {
      require('../api/dist/shared/infra/http/server.js');
      ipcMain.on('connected', connected => {
        return connected;
      });
    });
}
app.allowRendererProcessReuse = true;
