import moment from "moment";

import { AppState } from "src/shared/api";

export const loadInitialAppState = (): Promise<AppState> => {
    return new Promise((resolve) =>
        setTimeout(
            () =>
                resolve({
                    config: {},
                    project: {
                        title: "Test",
                        activityMap: new Array(30).fill(0).reduce((acc, _, index) => {
                            acc[
                                Math.floor(
                                    moment(new Date())
                                        .startOf("month")
                                        .add(index, "days")
                                        .toDate()
                                        .getTime() /
                                        (24 * 60 * 60 * 1000)
                                )
                            ] = {
                                hours: Math.random() * 8 * 60 * 60 * 1000,
                                description: "",
                            };
                            return acc;
                        }, {}),
                    },
                }),
            10
        )
    );
};
