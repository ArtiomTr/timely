import React from "react";

import { Flex } from "@adobe/react-spectrum";
import Pause from "@spectrum-icons/workflow/Pause";
import Stopwatch from "@spectrum-icons/workflow/Stopwatch";

import classes from "./Footer.m.scss";
import { CalendarRouteID } from "../../routes/CalendarRoute";
import { Link } from "../../routing/Link";
import { useStopwatchContext } from "../../StopwatchContext";
import { StopwatchTime } from "../../StopwatchTime";

export const Footer = () => {
    const { begin, start, stop } = useStopwatchContext();

    return (
        <Flex height="100%">
            {begin === undefined ? (
                <button onClick={start} className={classes["stopwatch"]}>
                    <Stopwatch size="S" />
                </button>
            ) : (
                <button onClick={stop} className={classes["stopwatch"]}>
                    <Pause size="S" />
                </button>
            )}
            <Link to={CalendarRouteID}>
                {(onClick) => (
                    <div onClick={onClick} className={classes["stopwatch-time"]}>
                        <StopwatchTime />
                    </div>
                )}
            </Link>
        </Flex>
    );
};
