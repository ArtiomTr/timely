import { readFile } from "fs";
import { join, parse } from "path";

import { Project } from "src/shared/api";

export const loadYearActivity = (
    projectPath: string,
    year: number
): Promise<Project["activityMap"]> =>
    new Promise((resolve) =>
        readFile(join(parse(projectPath).dir, "data", `${year}.json`), (err, output) => {
            if (!err) {
                resolve(JSON.parse(output.toString()));
            } else {
                resolve({});
            }
        })
    );
