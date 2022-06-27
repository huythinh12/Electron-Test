// Modules
const {app, BrowserWindow,Menu, Tray} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  console.log('Create Window');

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


let tray = null
app.whenReady().then(() => {
  //add your path
  tray = new Tray(path.join(app.getAppPath(), 'src', 'assets', 'Centaur.jpg'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
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
  tray = new Tray('Centaur.ico')
  tray.setToolTip('Tray for electron js')
  let template = [
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },]
  let contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
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
