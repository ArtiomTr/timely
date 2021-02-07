import { join, parse } from "path";

import moment from "moment";

import { DayActivity, Project } from "src/shared/api";
import { loadProject } from "./utils/loadProject";
import { safeWriteFile } from "./utils/safeWriteFile";
import { Timely } from "./Timely";

const msInDay = 24 * 60 * 60 * 1000;

export class ProjectLoader {
    private project: Project | undefined;
    private projectPath: string;

    public loadProject = async (timely: Timely, projectPath: string) => {
        this.projectPath = parse(projectPath).dir;

        this.project = await loadProject(timely, projectPath);

        timely.getWindow().webContents.send("projectLoad", this.project);
    };

    public setProject = (project: Project) => {
        this.project = project;
    };

    public saveProject = async (year: number) => {
        await safeWriteFile(
            join(this.projectPath, "data", `${year}.json`),
            JSON.stringify(
                Object.entries(this.project!.activityMap).reduce<Record<number, unknown>>(
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
        this.project!.activityMap[day] = activity;

        this.saveProject(moment(day * msInDay).get("year"));
    };

    public getProject = () => this.project;
}
