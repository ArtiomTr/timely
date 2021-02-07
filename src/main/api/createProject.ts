import { access, constants } from "fs";
import { join } from "path";

import { ipcMain } from "electron";

import { Timely } from "../Timely";
import { safeWriteFile } from "../utils/safeWriteFile";

export const createProject = (timely: Timely) => {
    ipcMain.on("createProject", (_, folder: string, title: string) => {
        const pathToProjectFile = join(folder, title, `${title}.tmproj`);

        access(pathToProjectFile, constants.F_OK, async (err) => {
            if (err) {
                await safeWriteFile(
                    pathToProjectFile,
                    JSON.stringify({
                        title,
                    })
                );

                timely.window.webContents.send("success");
            } else {
                timely.window.webContents.send("error", "Path is not empty");
            }
        });
    });
};
