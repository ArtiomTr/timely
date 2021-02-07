import { ipcMain } from "electron";

import { DayActivity } from "src/shared/api";
import type { Timely } from "../Timely";

export const setDayActivity = (timely: Timely) => {
    ipcMain.on("setDayActivity", (_, day: number, activity: DayActivity) => {
        timely.getProjectLoader().setDayActivity(day, activity);
    });
};
