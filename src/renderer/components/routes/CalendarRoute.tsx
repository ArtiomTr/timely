import React from "react";

import { Calendar } from "../calendar/Calendar";
import { Stopwatch } from "../Stopwatch";

export const CalendarRouteID = "calendar";

export const CalendarRoute = () => (
    <React.Fragment>
        <Stopwatch />
        <Calendar />
    </React.Fragment>
);
