import { app, dialog, ipcMain } from "electron";

import { Timely } from "../Timely";

export const pickFolder = (timely: Timely) => {
    ipcMain.on("pickFolder", async () => {
        const result = await dialog.showOpenDialog(timely.window, {
            properties: ["openDirectory"],
            defaultPath: app.getPath("documents"),
        });

        if (!result.canceled && result.filePaths.length > 0) {
            timely.window.webContents.send("onFolderPicken", result.filePaths[0]);
        }
    });
};
