import { mkdir, writeFile } from "fs";
import { parse } from "path";

export const safeWriteFile = (path: string, data: unknown): Promise<void> =>
    new Promise((resolve, reject) => {
        const dir = parse(path).dir;

        mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                writeFile(path, data, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
