import { join } from "path";

import moment from "moment";

import { DayActivity, Project } from "src/shared/api";
import { safeWriteFile } from "./utils/safeWriteFile";

const msInDay = 24 * 60 * 60 * 1000;

export class ProjectLoader {
    private project: Project;
    private projectPath: string;

    public loadProject = (projectPath: string) => {
        this.projectPath = projectPath;
    };

    public setProject = (project: Project) => {
        this.project = project;
    };

    public saveProject = async (year: number) => {
        await safeWriteFile(
            join(this.projectPath, "data", `${year}.json`),
            JSON.stringify(
                Object.entries(this.project.activityMap).reduce<Record<number, unknown>>(
                    (acc, [key, value]) => {
                        if (moment(+key * msInDay).get("year") === year) {
                            acc[+key] = value;
                        }
                        return acc;
                    },
                    {}
                )
            )
        );
    };

    public setDayActivity = (day: number, activity: DayActivity) => {
        this.project.activityMap[day] = activity;

        this.saveProject(moment(day * msInDay).get("year"));
    };
}
