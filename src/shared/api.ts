export interface Api {
    closeWindow: () => void;
    minimize: () => void;
    toggleMaximize: () => void;
    subscribeToMaximize: (observer: (isMaximized: boolean) => void) => void;
    loadInitialAppState: (onload: (state: AppState) => void) => void;
    setDayActivity: (day: number, activity: DayActivity) => void;
}

export type AppConfig = {
    lastOpenedProjectPath?: string;
};

export type DayActivity = {
    ms: number;
    description: string;
};

export type Project = {
    title: string;
    activityMap: Record<number, DayActivity>;
};

export type AppState = {
    config: AppConfig;
    project?: Project;
};
