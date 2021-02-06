import { join } from "path";
import { format } from "url";

import { BrowserWindow } from "electron";

import { __DEV__ } from "./__DEV__";

export const createWindow = (cleanup: () => void) => {
    const newWindow = new BrowserWindow({
        height: 600,
        width: 800,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            webSecurity: true,
            nodeIntegration: __DEV__,
            devTools: __DEV__,
            preload: join(__dirname, "preload.js"),
        },
    });

    if (__DEV__) {
        newWindow.webContents.openDevTools();
        newWindow.webContents.on("devtools-opened", () => {
            newWindow.focus();
            setImmediate(() => {
                newWindow.focus();
            });
        });
    }

    newWindow.loadURL(
        !__DEV__
            ? format({
                  pathname: join(__dirname, "./index.html"),
                  protocol: "file:",
                  slashes: true,
              })
            : "http://localhost:9000"
    );

    newWindow.on("closed", () => {
        cleanup();
    });

    return newWindow;
};
