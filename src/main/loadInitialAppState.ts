import { AppState } from "src/shared/api";

export const loadInitialAppState = (): Promise<AppState> => {
    return new Promise((resolve) =>
        setTimeout(
            () =>
                resolve({
                    config: {},
                    project: {
                        title: "Test",
                    },
                }),
            1000
        )
    );
};
