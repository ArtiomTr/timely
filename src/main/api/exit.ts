import { app, ipcMain } from "electron";

export const exit = () => {
    ipcMain.on("exit", () => {
        app.quit();
    });
};
