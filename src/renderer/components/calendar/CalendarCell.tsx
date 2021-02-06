import React, { useState } from "react";

import { Tooltip } from "@adobe/react-spectrum";
import clsx from "clsx";

import classes from "./CalendarCell.m.scss";
import { transitionColor } from "../utils/transitionColor";

export type CalendarCellProps = {
    day: number;
    monthDaysCount: number;
    today: number;
    activity: number;
};

const msInHours = 60 * 60 * 1000;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

export const CalendarCell = ({ day, monthDaysCount, today, activity }: CalendarCellProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <td>
            {day > 0 && day <= monthDaysCount && (
                <div style={{ position: "relative" }}>
                    <div
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        className={clsx(classes["cell"], day === today && classes["cell-today"])}
                    >
                        <div
                            className={classes["cell__number"]}
                            style={{
                                backgroundColor: transitionColor(
                                    { r: 74, g: 74, b: 74 },
                                    { r: 22, g: 135, b: 140 },
                                    clamp01(activity / (8 * msInHours))
                                ),
                            }}
                        >
                            {day}
                        </div>
                    </div>
                    <Tooltip
                        placement="bottom"
                        isOpen={isOpen}
                        position="absolute"
                        left="50%"
                        zIndex={999}
                        minWidth="size-2000"
                        UNSAFE_style={{
                            transform: "translateX(-50%)",
                        }}
                    >
                        Your activity was {Number((activity / msInHours).toFixed(1))} hour(-s).
                    </Tooltip>
                </div>
            )}
        </td>
    );
};
