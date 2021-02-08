import React, { useState } from "react";

import { Tooltip } from "@adobe/react-spectrum";
import clsx from "clsx";

import classes from "./CalendarCell.m.scss";
import { DayRouteID } from "../routes/DayRoute";
import { Link } from "../routing/Link";
import { clamp01 } from "../utils/clamp01";
import { msToHours } from "../utils/msToHours";
import { transitionColor } from "../utils/transitionColor";

export type CalendarCellProps = {
    day: Date;
    dayIndex: number;
    monthDaysCount: number;
    today: number;
    activity: number;
};

export const CalendarCell = ({
    dayIndex,
    day,
    monthDaysCount,
    today,
    activity,
}: CalendarCellProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const hours = msToHours(activity);

    return (
        <td>
            {dayIndex > 0 && dayIndex <= monthDaysCount && (
                <div style={{ position: "relative" }}>
                    <Link to={{ id: DayRouteID, parameters: { day } }}>
                        {(onClick) => (
                            <div
                                onClick={onClick}
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                                className={clsx(
                                    classes["cell"],
                                    dayIndex === today && classes["cell-today"]
                                )}
                            >
                                <div
                                    className={classes["cell__number"]}
                                    style={{
                                        backgroundColor: transitionColor(
                                            { r: 74, g: 74, b: 74 },
                                            { r: 22, g: 135, b: 140 },
                                            clamp01(hours / 8)
                                        ),
                                    }}
                                >
                                    {dayIndex}
                                </div>
                            </div>
                        )}
                    </Link>
                    <Tooltip
                        placement="bottom"
                        isOpen={isOpen}
                        position="absolute"
                        left="50%"
                        zIndex={3}
                        minWidth="size-1600"
                        UNSAFE_style={{
                            transform: "translateX(-50%)",
                        }}
                    >
                        Your activity was {msToHours(activity)} hour(-s).
                    </Tooltip>
                </div>
            )}
        </td>
    );
};
