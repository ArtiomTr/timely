export interface Api {
    closeWindow: () => void;
    minimize: () => void;
    toggleMaximize: () => void;
    subscribeToMaximize: (observer: (isMaximized: boolean) => void) => void;
    loadInitialAppState: (onload: (state: AppState) => void) => void;
}

export type AppConfig = {};

export type Project = {
    title: string;
    activityMap: Record<number, number>;
};

export type AppState = {
    config: AppConfig;
    project?: Project;
};
