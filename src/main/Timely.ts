import { writeFile } from "fs";

import { BrowserWindow, ipcMain } from "electron";
import invariant from "tiny-invariant";

import { AppConfig, AppState, NotificationType } from "src/shared/api";
import { close } from "./api/close";
import { createProject } from "./api/createProject";
import { minimize } from "./api/minimize";
import { onMaximize } from "./api/onMaximize";
import { openProject } from "./api/openProject";
import { pickFolder } from "./api/pickFolder";
import { requestInitialAppState } from "./api/requestInitialAppState";
import { setDayActivity } from "./api/setDayActivity";
import { toggleMaximize } from "./api/toggleMaximize";
import { readOrCreate } from "./utils/readOrCreate";
import { CONFIG_PATH } from "./constants";
import { createWindow } from "./createWindow";
import { ProjectLoader } from "./ProjectLoader";

const apiFunctionInitializers = [
    close,
    minimize,
    onMaximize,
    requestInitialAppState,
    toggleMaximize,
    setDayActivity,
    pickFolder,
    createProject,
    openProject,
];

const defaultConfig: AppConfig = {};

export class Timely {
    private mainWindow: BrowserWindow | null;
    private mainProjectLoader: ProjectLoader;
    private config: AppConfig;

    public constructor() {
        this.mainProjectLoader = new ProjectLoader();
    }

    public initializeWindow = () => {
        this.mainWindow = createWindow(() => {
            this.mainWindow = null;
        });
    };

    public initialize = async () => {
        this.initializeWindow();

        this.config = await readOrCreate(CONFIG_PATH, defaultConfig);

        if (this.config.lastOpenedProjectPath) {
            this.mainProjectLoader.loadProject(this, this.config.lastOpenedProjectPath);
        }

        this.mainWindow!.webContents.send("loadInitialAppState", this.getState());

        apiFunctionInitializers.map((initializer) => initializer(this));
    };

    public setLastOpenedProject = (path: string) => {
        this.config.lastOpenedProjectPath = path;

        writeFile(CONFIG_PATH, JSON.stringify(this.config), (error) => {
            if (error)
                this.getWindow().webContents.send(
                    "error",
                    NotificationType.GENERAL,
                    error?.message
                );
        });
    };

    public isWindowInitialized = () => this.mainWindow !== null;

    public getProjectLoader(): ProjectLoader {
        return this.mainProjectLoader;
    }

    public getState(): AppState {
        return { config: this.config, project: this.mainProjectLoader.getProject() };
    }

    public getWindow(): BrowserWindow {
        invariant(this.mainWindow, "Could not get window, because it is destroyed");

        return this.mainWindow;
    }
}
