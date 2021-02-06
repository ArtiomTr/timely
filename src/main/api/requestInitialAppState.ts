import { join } from "path";

import { app, ipcMain } from "electron";

import { AppConfig } from "src/shared/api";
import { Timely } from "../Timely";
import { finishConfigurationLoading } from "../utils/finishConfigurationLoading";
import { readOrCreate } from "../utils/readOrCreate";

const configPath = join(".timely", "config.json");

const defaultConfig: AppConfig = {};

export const requestInitialAppState = (timely: Timely) =>
    ipcMain.on("requestInitialAppState", async () => {
        const fullPath = join(app.getPath("appData"), configPath);

        const config = await readOrCreate(fullPath, defaultConfig);

        const appState = finishConfigurationLoading(config);

        if (appState.project) {
            timely.projectManager.loadProject(config.lastOpenedProjectPath!);

            timely.projectManager.setProject(appState.project);
        }

        timely.window.webContents.send("loadInitialAppState", appState);
    });
