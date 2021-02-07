import { app, dialog, ipcMain } from "electron";

import type { Timely } from "../Timely";

export const pickFolder = (timely: Timely) => {
    ipcMain.on("pickFolder", async () => {
        const result = await dialog.showOpenDialog(timely.getWindow(), {
            properties: ["openDirectory"],
            defaultPath: app.getPath("documents"),
        });

        if (!result.canceled && result.filePaths.length > 0) {
            timely.getWindow().webContents.send("onFolderPicken", result.filePaths[0]);
        }
    });
};
