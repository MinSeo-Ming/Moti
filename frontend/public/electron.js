var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow, Menu = _a.Menu, Tray = _a.Tray, nativeImage = _a.nativeImage, ipcMain = _a.ipcMain;
var path = require("path");
var isDev = require("electron-is-dev");
var electron = require("electron");
var tray;
var mainWindow;
var loginWindow;
var isQuiting = false;
var loginWebContents;
var isLogin = false;
var isFed = false;
var gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.isQuiting = true;
    app.quit();
}
else {
    app.on("second-instance", function (event, commandLine, workingDirectory, additionalData) {
        // Print out data received from the second instance.
        console.log(additionalData);
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized())
                mainWindow.restore();
            mainWindow.focus();
        }
    });
    // Create myWindow, load the rest of the app, etc...
    app.whenReady().then(function () {
        createWindow();
    });
}
var createWindow = function () {
    //
    // MainWindow
    var myDisplay = electron.screen.getPrimaryDisplay();
    var width = myDisplay.bounds.width;
    var height = myDisplay.bounds.height;
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
            contextIsolation: false
        }
    });
    mainWindow.once("ready-to-show", function () { return mainWindow.show(); });
    mainWindow.on("closed", function () { return (mainWindow = null); });
    mainWindow.on("close", function (event) {
        if (!isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
        return undefined;
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : "file://".concat(path.join(__dirname, "../build/index.html")));
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: "detach" });
    }
    mainWindow.focus();
    loginWindow = new BrowserWindow({
        width: 800,
        height: 800,
        show: false
    });
    // 트레이
    var iconPath = "".concat(__dirname, "/images/moti/tray_test.ico");
    tray = new Tray(nativeImage.createFromPath(iconPath));
    tray.setToolTip("ＭＯＴＩ");
    var contextMenu = Menu.buildFromTemplate([
        {
            label: "열기",
            type: "normal",
            click: function () {
                mainWindow.show();
            }
        },
        {
            label: "숨기기",
            type: "normal",
            click: function () {
                mainWindow.hide();
            }
        },
        {
            label: "종료",
            type: "normal",
            click: function () {
                app.isQuiting = true;
                mainWindow.removeAllListeners();
                loginWindow.removeAllListeners();
                app.quit();
            }
        },
    ]);
    tray.on("click", function () { return mainWindow.show(); });
    tray.setContextMenu(contextMenu);
    //
    //Login WIndow
    loginWindow.setMenu(null);
    loginWebContents = loginWindow.webContents;
    loginWebContents.on("did-navigate", function () {
        var currentURL = loginWindow.webContents.getURL();
        mainWindow.send("URL_CALL", currentURL);
    });
    loginWindow.on("close", function (event) {
        if (!isQuiting) {
            event.preventDefault();
            loginWindow.hide();
            var currentURL = loginWindow.webContents.getURL();
            mainWindow.send("LOGIN_WINDOW_CLOSE", currentURL);
        }
        return undefined;
    });
};
// 알림
var notifier = require("node-notifier");
var WindowsToaster = require("node-notifier/notifiers/toaster");
new WindowsToaster({ withFallback: false, customPath: undefined });
ipcMain.on("MORNING_ALERT", function () {
    notifier.notify({
        title: "좋은 아침이에요!",
        message: "제 밥 잊지 않으실거죠? 오늘도 화이팅!",
        icon: "src/assets/icons/alert/morningalert.gif",
        sound: true,
        // id: undefined, // Number. ID to use for closing notification.
        appID: "moti"
    }, function (error, response) {
        console.log(error, response);
    });
});
ipcMain.on("EVENING_ALERT", function () {
    notifier.notify({
        title: "쥔님.. 배고파요..T.T",
        message: "하루종일 굶었어요~ 커밋 잊지마세요!",
        icon: "src/assets/icons/alert/eveningalert.gif",
        sound: true,
        // id: undefined, // Number. ID to use for closing notification.
        appID: "moti"
    }, function (error, response) {
        console.log(error, response);
    });
});
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
app.on("before-quit", function (event) {
    tray.destroy();
});
ipcMain.on("LOGIN_ACTION", function (event, args) {
    loginWindow.loadURL("https://github.com/login/device");
    loginWindow.webContents.session.clearStorageData();
    loginWindow.show();
});
ipcMain.on("HIDE_LOGIN_WINDOW", function (event, args) {
    loginWindow.hide();
});
ipcMain.on("HIDE_WINDOW", function (event, args) {
    mainWindow.hide();
});
ipcMain.on("MINIMIZE_WINDOW", function (event, args) {
    mainWindow.minimize();
});
ipcMain.on("LOGIN_SUCCESS", function (event, args) {
    isLogin = args;
});
ipcMain.on("LOGOUT", function (event, args) {
    isLogin = args;
});
