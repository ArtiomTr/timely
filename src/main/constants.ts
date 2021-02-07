import { join } from "path";

import { app } from "electron";

export const CONFIG_PATH = join(app.getPath("appData"), ".timely", "config.json");
