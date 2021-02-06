export const msFromPoint = (point: Date | undefined) =>
    point === undefined ? 0 : new Date().getTime() - point.getTime();
