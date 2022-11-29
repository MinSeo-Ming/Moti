const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")
const electron = require("electron")

let tray
let mainWindow
let loginWindow
let isQuiting = false
let loginWebContents
let isLogin = false
let isFed = false

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.isQuiting = true
  app.quit()
} else {
  app.on("second-instance", (event, commandLine, workingDirectory, additionalData) => {
    // Print out data received from the second instance.
    console.log(additionalData)

    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow()
  })
}
const createWindow = () => {
  //
  // MainWindow
  const myDisplay = electron.screen.getPrimaryDisplay()
  let width = myDisplay.bounds.width
  let height = myDisplay.bounds.height
  mainWindow = new BrowserWindow({
    width: 408,
    height: 308,
    x: width - 408,
    y: height - 500,
    resizable: false,
    transparent: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
      // preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
    },
  })
  mainWindow.once("ready-to-show", () => mainWindow.show())
  mainWindow.on("closed", () => (mainWindow = null))
  mainWindow.on("close", (event) => {
    if (!isQuiting) {
      event.preventDefault()
      mainWindow.hide()
    }
    return undefined
  })

  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  )
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" })
  }

  mainWindow.focus()
  loginWindow = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
  })

  // 트레이
  const iconPath = `${__dirname}/images/moti/tray_test.ico`
  tray = new Tray(nativeImage.createFromPath(iconPath))

  tray.setToolTip("ＭＯＴＩ")
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "열기",
      type: "normal",
      click() {
        mainWindow.show()
      },
    },
    {
      label: "숨기기",
      type: "normal",
      click() {
        mainWindow.hide()
      },
    },
    {
      label: "종료",
      type: "normal",
      click() {
        app.isQuiting = true
        mainWindow.removeAllListeners()
        loginWindow.removeAllListeners()
        app.quit()
      },
    },
  ])
  tray.on("click", () => mainWindow.show())
  tray.setContextMenu(contextMenu)

  //
  //Login WIndow
  loginWindow.setMenu(null)
  loginWebContents = loginWindow.webContents
  loginWebContents.on("did-navigate", () => {
    const currentURL: string = loginWindow.webContents.getURL()
    mainWindow.send("URL_CALL", currentURL)
  })
  loginWindow.on("close", (event) => {
    if (!isQuiting) {
      event.preventDefault()
      loginWindow.hide()
      const currentURL: string = loginWindow.webContents.getURL()
      mainWindow.send("LOGIN_WINDOW_CLOSE", currentURL)
    }
    return undefined
  })
}

// 알림
const notifier = require("node-notifier")
const WindowsToaster = require("node-notifier/notifiers/toaster")
new WindowsToaster({ withFallback: false, customPath: undefined })
ipcMain.on("MORNING_ALERT", () => {
  notifier.notify(
    {
      title: "좋은 아침이에요!", // String. Required
      message: "제 밥 잊지 않으실거죠? 오늘도 화이팅!", // String. Required if remove is not defined
      icon: "src/assets/icons/alert/morningalert.gif", // String. Absolute path to Icon
      sound: true, // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
      // id: undefined, // Number. ID to use for closing notification.
      appID: "moti", // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
      // remove: undefined, // Number. Refer to previously created notification to close.
      // install: undefined, // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
    },
    function (error, response) {
      console.log(error, response)
    }
  )
})
ipcMain.on("EVENING_ALERT", () => {
  notifier.notify(
    {
      title: "쥔님.. 배고파요..T.T", // String. Required
      message: "하루종일 굶었어요~ 커밋 잊지마세요!", // String. Required if remove is not defined
      icon: "src/assets/icons/alert/eveningalert.gif", // String. Absolute path to Icon
      sound: true, // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
      // id: undefined, // Number. ID to use for closing notification.
      appID: "moti", // String. App.ID and app Name. Defaults to no value, causing SnoreToast text to be visible.
      // remove: undefined, // Number. Refer to previously created notification to close.
      // install: undefined, // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
    },
    function (error, response) {
      console.log(error, response)
    }
  )
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on("before-quit", function (event) {
  tray.destroy()
})

ipcMain.on("LOGIN_ACTION", (event, args) => {
  loginWindow.loadURL("https://github.com/login/device")
  loginWindow.webContents.session.clearStorageData()
  loginWindow.show()
})

ipcMain.on("HIDE_LOGIN_WINDOW", (event, args) => {
  loginWindow.hide()
})

ipcMain.on("HIDE_WINDOW", (event, args) => {
  mainWindow.hide()
})

ipcMain.on("MINIMIZE_WINDOW", (event, args) => {
  mainWindow.minimize()
})

ipcMain.on("LOGIN_SUCCESS", (event, args) => {
  isLogin = args
})

ipcMain.on("LOGOUT", (event, args) => {
  isLogin = args
})
