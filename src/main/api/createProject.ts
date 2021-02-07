import { access, constants } from "fs";
import { join } from "path";

import { ipcMain } from "electron";

import { NotificationType } from "src/shared/api";
import type { Timely } from "../Timely";
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

                timely.getWindow().webContents.send("success", NotificationType.NEW_PROJECT);

                timely.getProjectLoader().loadProject(timely, pathToProjectFile);
                timely.setLastOpenedProject(pathToProjectFile);
            } else {
                timely
                    .getWindow()
                    .webContents.send("error", NotificationType.NEW_PROJECT, "Path is not empty");
            }
        });
    });
};
