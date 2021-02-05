import { contextBridge, ipcRenderer } from "electron";

import type { Api } from "src/shared/api";

const api: Api = {
    closeWindow: () => {
        ipcRenderer.send("window.close");
    },
    toggleMaximize: () => {
        ipcRenderer.send("window.toggleMaximize");
    },
    minimize: () => {
        ipcRenderer.send("window.minimize");
    },
    subscribeToMaximize: (observer) => {
        ipcRenderer.on("window.maximizeChanged", (_, isMaximized) => observer(isMaximized));
    },
};

contextBridge.exposeInMainWorld(
    "api",
    api
    // {
    //   closeWindow: () => {},

    //   // send: (channel, data) => {
    //   //   // whitelist channels
    //   //   let validChannels = ["toMain"];
    //   //   if (validChannels.includes(channel)) {
    //   //     ipcRenderer.send(channel, data);
    //   //   }
    //   // },
    //   // receive: (channel, func) => {
    //   //   let validChannels = ["fromMain"];
    //   //   if (validChannels.includes(channel)) {
    //   //     // Deliberately strip event as it includes `sender`
    //   //     ipcRenderer.on(channel, (event, ...args) => func(...args));
    //   //   }
    //   // },
    // }
);
