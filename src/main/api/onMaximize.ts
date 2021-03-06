import type { Timely } from "../Timely";

export const onMaximize = (timely: Timely) => {
    const mainWindow = timely.getWindow();

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("onMaximized", true);
    });

    mainWindow.on("minimize", () => {
        mainWindow.webContents.send("onMaximized", false);
    });
};
