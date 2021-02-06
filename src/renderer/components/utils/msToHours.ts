const msInHour = 60 * 60 * 1000;

export const msToHours = (ms: number) => Number((ms / msInHour).toFixed(1));

export const hoursToMs = (hours: number) => hours * msInHour;
