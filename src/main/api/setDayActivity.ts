import { ipcMain } from "electron";

import { DayActivity } from "src/shared/api";
import { Timely } from "../Timely";

export const setDayActivity = (timely: Timely) => {
    ipcMain.on("setDayActivity", (_, day: number, activity: DayActivity) => {
        timely.projectManager.setDayActivity(day, activity);
    });
};
