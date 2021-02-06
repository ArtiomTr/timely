import React, { useEffect, useReducer } from "react";

import moment from "moment-timezone";

import { msFromPoint } from "./utils/msFromPoint";
import { useStopwatchContext } from "./StopwatchContext";

export const StopwatchTime = () => {
    const [, forceUpdate] = useReducer((value) => ++value, 0);

    const { begin, totalTime } = useStopwatchContext();

    useEffect(() => {
        const interval = setInterval(forceUpdate, 105);
        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            {moment(msFromPoint(begin) + totalTime)
                .tz("utc")
                .format("HH:mm:ss:SS")}
        </React.Fragment>
    );
};
