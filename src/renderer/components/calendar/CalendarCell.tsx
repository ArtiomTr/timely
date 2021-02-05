import React from "react";

import clsx from "clsx";

import classes from "./CalendarCell.m.scss";
import { transitionColor } from "../utils/transitionColor";

export type CalendarCellProps = {
    day: number;
    monthDaysCount: number;
    today: number;
    activity: number;
};

export const CalendarCell = ({ day, monthDaysCount, today, activity }: CalendarCellProps) => (
    <td>
        {day > 0 && day <= monthDaysCount && (
            <div className={clsx(classes["cell"], day === today && classes["cell-today"])}>
                <div
                    className={classes["day__number"]}
                    style={{
                        backgroundColor: transitionColor(
                            { r: 74, g: 74, b: 74 },
                            { r: 22, g: 135, b: 140 },
                            activity
                        ),
                    }}
                >
                    {day}
                </div>
            </div>
        )}
    </td>
);
