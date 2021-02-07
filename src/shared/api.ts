export interface Api {
    closeWindow: () => void;
    minimize: () => void;
    toggleMaximize: () => void;
    subscribeToMaximize: (observer: (isMaximized: boolean) => void) => void;
    loadInitialAppState: (onload: (state: AppState) => void) => void;
    setDayActivity: (day: number, activity: DayActivity) => void;
    pickFolder: () => void;
    subscribeToFolderPicken: (callback: (folder: string) => void) => void;
    createProject: (path: string, title: string) => void;
    subscribeToNotifications: (
        onSuccess: (type: NotificationType) => void,
        onError: (type: NotificationType, errorText: string) => void
    ) => void;
    openProject: () => void;
    onProjectLoad: (callback: (project: Project) => void) => void;
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

export enum NotificationType {
    NEW_PROJECT,
    GENERAL,
}
