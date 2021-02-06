import { contextBridge, ipcRenderer } from "electron";

import type { Api, DayActivity } from "src/shared/api";

const api: Api = {
    closeWindow: () => {
        ipcRenderer.send("close");
    },
    toggleMaximize: () => {
        ipcRenderer.send("toggleMaximize");
    },
    minimize: () => {
        ipcRenderer.send("minimize");
    },
    subscribeToMaximize: (observer) => {
        ipcRenderer.on("onMaximized", (_, isMaximized) => observer(isMaximized));
    },
    loadInitialAppState: (onload) => {
        ipcRenderer.on("loadInitialAppState", (_, state) => onload(state));
        ipcRenderer.send("requestInitialAppState");
    },
    setDayActivity: (day: number, activity: DayActivity) => {
        ipcRenderer.send("setDayActivity", day, activity);
    },
};

contextBridge.exposeInMainWorld("api", api);
