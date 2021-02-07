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
    pickFolder: () => {
        ipcRenderer.send("pickFolder");
    },
    subscribeToFolderPicken: (callback) => {
        ipcRenderer.on("onFolderPicken", (_, folder) => callback(folder));
    },
    createProject: (folder, title) => {
        ipcRenderer.send("createProject", folder, title);
    },
    subscribeToNotifications: (onSuccess, onError) => {
        ipcRenderer.on("success", (_, type) => onSuccess(type));
        ipcRenderer.on("error", (_, type, errorText) => onError(type, errorText));
    },
};

contextBridge.exposeInMainWorld("api", api);
