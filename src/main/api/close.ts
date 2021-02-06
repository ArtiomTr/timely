import { ipcMain } from "electron";

import type { Timely } from "../Timely";

export const close = (timely: Timely) => {
    ipcMain.on("close", () => {
        timely.window.close();
    });
};
