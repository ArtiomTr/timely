import { app, dialog, FileFilter, ipcMain } from "electron";

import { ExportType } from "src/shared/api";
import { Timely } from "../Timely";

const formatToFilter: Record<number, FileFilter> = {
    [ExportType.JSON]: {
        name: "JSON file",
        extensions: ["json"],
    },
    [ExportType.CSV]: {
        name: "CSV file",
        extensions: ["csv"],
    },
    [ExportType.XLS]: {
        name: "Excel sheet file",
        extensions: ["xlsx", "xls"],
    },
};

export const pickExportFile = (timely: Timely) => {
    ipcMain.on("pickExportFile", async (_, format: ExportType) => {
        const { canceled, filePath } = await dialog.showSaveDialog(timely.getWindow(), {
            defaultPath: app.getPath("documents"),
            filters: [
                {
                    name: "all",
                    extensions: ["*"],
                },
                formatToFilter[format],
            ],
        });

        if (!canceled && filePath) {
            timely.getWindow().webContents.send("onExportFilePicked", filePath);
        }
    });
};
