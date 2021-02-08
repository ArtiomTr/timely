import { writeFile } from "fs";

import { ipcMain } from "electron";
import { utils, write } from "xlsx";

import { ExportType, NotificationType, Project } from "src/shared/api";
import { Timely } from "../Timely";

const availableFormats = [ExportType.JSON, ExportType.CSV, ExportType.XLS];

type Stringifier = (activity: Project["activityMap"]) => string;

const msToHours = (ms: number) => Number((ms / (60 * 60 * 1000)).toFixed(1));

const dayToDate = (day: number) => new Date((day + 1) * 24 * 60 * 60 * 1000);

const jsonStringifier: Stringifier = (activityMap) =>
    JSON.stringify(
        Object.entries(activityMap).map(([day, activity]) => ({
            date: dayToDate(parseInt(day)),
            description: activity.description,
            time: activity.ms,
        }))
    );

const csvStringifier: Stringifier = (activityMap) =>
    Object.entries(activityMap)
        .map(([day, activity]) => [
            dayToDate(parseInt(day)),
            `"${activity.description}"`,
            msToHours(activity.ms),
        ])
        .join("\n");

const xlsStringifier: Stringifier = (activityMap) => {
    const sheet = utils.json_to_sheet(
        [
            ["Date", "Description", "Time (hours)"],
            ...Object.entries(activityMap).map(([day, activity]) => [
                dayToDate(parseInt(day)),
                activity.description,
                msToHours(activity.ms),
            ]),
        ],
        {
            skipHeader: true,
        }
    );

    const wb = utils.book_new();

    utils.book_append_sheet(wb, sheet);

    return write(wb, { type: "buffer" });
};

const formatToStringifier: Record<number, Stringifier> = {
    [ExportType.JSON]: jsonStringifier,
    [ExportType.CSV]: csvStringifier,
    [ExportType.XLS]: xlsStringifier,
};

export const exportData = (timely: Timely) => {
    ipcMain.on(
        "exportData",
        async (_, path: string, begin: number, end: number, format: ExportType) => {
            const project = timely.getState().project;

            format = +format;

            if (!project) {
                timely
                    .getWindow()
                    .webContents.send("error", NotificationType.EXPORT, "No project to export");
            } else if (availableFormats.includes(format)) {
                const activityMap = Object.entries(project.activityMap).reduce<
                    Project["activityMap"]
                >((acc, [day, activity]) => {
                    const parsedDay = parseInt(day);

                    if (parsedDay >= begin && parsedDay < end) {
                        acc[parsedDay] = activity;
                    }

                    return acc;
                }, {});

                const text = formatToStringifier[format](activityMap);

                writeFile(path, text, (err) => {
                    if (err) {
                        timely
                            .getWindow()
                            .webContents.send(
                                "error",
                                NotificationType.EXPORT,
                                "Couldn't export project"
                            );
                    } else {
                        timely.getWindow().webContents.send("success", NotificationType.EXPORT);
                    }
                });
            } else {
                timely
                    .getWindow()
                    .webContents.send("error", NotificationType.EXPORT, "Unexpected export format");
            }
        }
    );
};
