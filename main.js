// Modules
const {app, BrowserWindow,Menu, Tray,Notification } = require('electron')
//SEVER
require('./sever/sever.js')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const contextMenu = Menu.buildFromTemplate([
  { label: 'open' },
  { label: 'setting' },
  { label: 'exit', role: 'quit'},
])
function createTray(){
  // let tray = null
  tray = new Tray('Centaur.ico')
 
  tray.setToolTip('This is my thinhnguyen - application')

  tray.setContextMenu(contextMenu)
}
// Create a new BrowserWindow when `app` is ready
function createWindow () {

  console.log('Create Window');
  createTray()
  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    frame: true,
    // titleBarStyle: 'hidden',
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'
  
function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(() => {
console.log("xong roi ne")
setTimeout(() => {
  showNotification()
}, (3000));
})
  // Load index.html into the new BrowserWindow
mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools(); // dùng để mở devtool của chromium dc gọi là cửa sổ inspector 

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })

}

// Electron `app` is ready
app.on('ready', ()=>{
  console.log(app.getAppPath())
  createWindow()

})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})


