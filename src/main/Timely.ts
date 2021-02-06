import { BrowserWindow } from "electron";
import invariant from "tiny-invariant";

import { close } from "./api/close";
import { minimize } from "./api/minimize";
import { onMaximize } from "./api/onMaximize";
import { requestInitialAppState } from "./api/requestInitialAppState";
import { setDayActivity } from "./api/setDayActivity";
import { toggleMaximize } from "./api/toggleMaximize";
import { createWindow } from "./createWindow";
import { ProjectLoader } from "./ProjectLoader";

const apiFunctionInitializers = [
    close,
    minimize,
    onMaximize,
    requestInitialAppState,
    toggleMaximize,
    setDayActivity,
];

export class Timely {
    private mainWindow: BrowserWindow | null;
    private mainProjectLoader: ProjectLoader;

    public constructor() {
        this.mainProjectLoader = new ProjectLoader();
    }

    public initializeWindow = () => {
        this.mainWindow = createWindow(() => {
            this.mainWindow = null;
        });
    };

    public initialize = () => {
        this.initializeWindow();

        apiFunctionInitializers.map((initializer) => initializer(this));
    };

    public isWindowInitialized = () => this.mainWindow !== null;

    public get projectManager(): ProjectLoader {
        return this.mainProjectLoader;
    }

    public get window(): BrowserWindow {
        invariant(this.mainWindow, "Could not get window, because it is destroyed");

        return this.mainWindow;
    }
}
