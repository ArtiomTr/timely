/**
 * Entry point of the Election app.
 */
import path from "path";
import url from "url";

import { app, BrowserWindow, ipcMain } from "electron";

import { loadInitialAppState } from "./loadInitialAppState";

let mainWindow: Electron.BrowserWindow | null;

const __DEV__ = process.env.NODE_ENV === "development";

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            webSecurity: true,
            nodeIntegration: __DEV__,
            devTools: __DEV__,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    if (__DEV__) {
        mainWindow.webContents.openDevTools();
        mainWindow.webContents.on("devtools-opened", () => {
            mainWindow?.focus();
            setImmediate(() => {
                mainWindow?.focus();
            });
        });
    }

    mainWindow
        .loadURL(
            !__DEV__
                ? url.format({
                      pathname: path.join(__dirname, "./index.html"),
                      protocol: "file:",
                      slashes: true,
                  })
                : "http://localhost:9000"
        )
        .finally(() => {
            /* no action */
        });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    mainWindow.on("maximize", () => {
        mainWindow?.webContents.send("window.maximizeChanged", true);
    });

    mainWindow.on("unmaximize", () => {
        mainWindow?.webContents.send("window.maximizeChanged", false);
    });
}

async function sendInitialAppState() {
    const state = await loadInitialAppState();

    mainWindow!.webContents.send("loadInitialAppState", state);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("window.close", () => {
    mainWindow?.close();
});

ipcMain.on("window.toggleMaximize", () => {
    if (mainWindow?.isMaximized()) {
        mainWindow?.unmaximize();
    } else {
        mainWindow?.maximize();
    }
});

ipcMain.on("window.minimize", () => {
    mainWindow?.minimize();
});

ipcMain.on("requestInitialAppState", sendInitialAppState);
