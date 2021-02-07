import { app, dialog, ipcMain } from "electron";

import { Timely } from "../Timely";

export const openProject = (timely: Timely) => {
    ipcMain.on("openProject", async () => {
        const result = await dialog.showOpenDialog(timely.getWindow(), {
            properties: ["openFile"],
            defaultPath: app.getPath("documents"),
            filters: [
                {
                    name: "all",
                    extensions: ["*"],
                },
                {
                    name: "Timely project",
                    extensions: ["tmproj"],
                },
            ],
        });

        if (!result.canceled && result.filePaths.length > 0) {
            timely.getProjectLoader().loadProject(timely, result.filePaths[0]);
            timely.setLastOpenedProject(result.filePaths[0]);
        }
    });
};
