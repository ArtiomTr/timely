import { readFile } from "fs";

import moment from "moment";

import { Project } from "src/shared/api";
import { loadYearActivity } from "./loadYearActivity";
import { Timely } from "../Timely";

export const loadProject = (timely: Timely, path: string): Promise<Project | undefined> =>
    new Promise((resolve) => {
        readFile(path, async (err, data) => {
            if (err) {
                timely
                    .getWindow()
                    .webContents.send(
                        "error",
                        "Could not load project: file not exists or you don't have permission for it"
                    );

                resolve(undefined);
            } else {
                const project: Project = JSON.parse(data.toString());

                project.activityMap = await loadYearActivity(path, moment(new Date()).get("year"));

                resolve(project);
            }
        });
    });
