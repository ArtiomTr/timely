import { ipcMain } from "electron";

import type { Timely } from "../Timely";

export const minimize = (timely: Timely) => {
    ipcMain.on("minimize", () => {
        timely.window.minimize();
    });
};
