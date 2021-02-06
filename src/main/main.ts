import { app } from "electron";

import { Timely } from "./Timely";

const timely = new Timely();

app.on("ready", timely.initialize);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (!timely.isWindowInitialized()) {
        timely.initializeWindow();
    }
});
