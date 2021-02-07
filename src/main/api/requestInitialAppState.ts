import { ipcMain } from "electron";

import { Timely } from "../Timely";

export const requestInitialAppState = (timely: Timely) =>
    ipcMain.on("requestInitialAppState", async () => {
        timely.getWindow().webContents.send("loadInitialAppState", timely.getState());
    });
