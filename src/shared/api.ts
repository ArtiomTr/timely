export interface Api {
    closeWindow: () => void;
    minimize: () => void;
    toggleMaximize: () => void;
    subscribeToMaximize: (observer: (isMaximized: boolean) => void) => void;
}
