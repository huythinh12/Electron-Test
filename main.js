// Modules
const {app, BrowserWindow, ipcMain,Menu,Tray} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem')
const appMenu = require('./menu')
const e = require('express')

require("./sever/sever")
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray = null
const contextMenu = Menu.buildFromTemplate([
  { label: 'open' },
  { label: 'setting' },
  { label: 'exit', role: 'quit'},
])

function createTray(){  
    tray = new Tray('duck.ico')
    tray.setToolTip('This is my thinhnguyen - application')
    tray.setContextMenu(contextMenu)
}

// Listen for new item request
ipcMain.on('new-item', (e, itemUrl) => {

  // Get new item and send back to renderer
  readItem( itemUrl, item => {
    e.sender.send('new-item-success', item)
  })
})

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  createTray()
  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 400, defaultHeight: 650
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    minWidth: 500, minHeight: 300,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Create main app menu
  appMenu(mainWindow.webContents)

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')

  // Manage new window state
  state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.onbeforeunload = (e) =>{
    e.preventDefault()
    mainWindow.hide()
  }

  mainWindow.on('closed',  (e) => {
    // mainWindow = null
    // tray = null
   
    console.log('Window hiddnen')
    return false
    // mainWindow.hide()
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
