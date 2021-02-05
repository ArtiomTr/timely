export const toMonthDay = (week: number, weekday: number, firstWeekdayOfMonth: number) =>
    week * 7 + weekday + 1 - firstWeekdayOfMonth;
