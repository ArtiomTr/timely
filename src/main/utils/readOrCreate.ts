import { access, constants, readFile } from "fs";

import { safeWriteFile } from "./safeWriteFile";

export const readOrCreate = <T>(path: string, defaultValue: T): Promise<T> =>
    new Promise((resolve, reject) => {
        access(path, constants.F_OK, (err) => {
            if (err) {
                safeWriteFile(path, defaultValue).then(() => resolve(defaultValue));
            } else {
                readFile(path, (err, output) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(output.toString()));
                    }
                });
            }
        });
    });
