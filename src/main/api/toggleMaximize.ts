import { ipcMain } from "electron";

import type { Timely } from "../Timely";

export const toggleMaximize = (timely: Timely) => {
    const mainWindow = timely.getWindow();

    ipcMain.on("toggleMaximize", () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
};
