'use strict'

import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({webPreferences: {nodeIntegration: true}})

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();

  /**
   * OPEN FILE UPLOAD TO SELECT VIDEO TO BLUR
   */
  ipcMain.on('OPEN_FILE_UPLOAD', async (event, arg) => {
    try{
      console.log(arg) // prints "ping"
      // event.reply('asynchronous-reply', 'pong')
      const result = await dialog.showOpenDialog({ properties: ['openFile'] });
      console.log(result);
      event.reply('OPEN_FILE_UPLOAD', result);
    } catch(err){
      event.reply('OPEN_FILE_UPLOAD_ERR', 'ERR OCCURRED!');
    }
  });
  

  /**
   * PROCESS SELECTED VIDEO
   * arg will be the videoPath 
   */
  ipcMain.on('PROCESS_VIDEO', async(event, arg) => {
    // console.log(arg) // prints "ping"
    // event.returnValue = 'pong'
    try {
      console.log('processing selected video: ', arg)
      // event.reply('OPEN_FILE_UPLOAD', result);
    } catch (error) {
      event.reply('PROCESS_VIDEO_ERR', 'ERR OCCURRED!');
    }

  })


  
})
