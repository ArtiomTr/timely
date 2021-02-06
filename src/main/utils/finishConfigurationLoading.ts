import moment from "moment";

import { AppConfig, AppState } from "src/shared/api";

export const finishConfigurationLoading = (config: AppConfig): AppState => {
    const project = {
        title: "Test",
        activityMap: new Array(30).fill(0).reduce((acc, _, index) => {
            acc[
                Math.floor(
                    moment(new Date()).startOf("month").add(index, "days").toDate().getTime() /
                        (24 * 60 * 60 * 1000)
                )
            ] = {
                ms: Math.random() * 8 * 60 * 60 * 1000,
                description: "",
            };
            return acc;
        }, {}),
    };

    return {
        config,
        project,
    };
};
