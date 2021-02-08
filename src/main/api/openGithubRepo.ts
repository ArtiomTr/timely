import { ipcMain, shell } from "electron";

export const openGithubRepo = () => {
    ipcMain.on("openGithubRepo", () => {
        shell.openExternal("https://github.com/ArtiomTr/timely");
    });
};
