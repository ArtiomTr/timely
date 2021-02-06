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
    const { begin, toggle } = useStopwatchContext();

    return (
        <Flex height="100%">
            <button onClick={toggle} className={classes["stopwatch"]}>
                {begin === undefined ? <Stopwatch size="S" /> : <Pause size="S" />}
            </button>
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
