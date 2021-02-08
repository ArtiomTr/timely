import React from "react";

import Calendar from "@spectrum-icons/workflow/Calendar";
import ViewDay from "@spectrum-icons/workflow/ViewDay";

import { SidebarItemProps } from "./SidebarItem";
import { CalendarRouteID } from "../../routes/CalendarRoute";
import { DayRouteID } from "../../routes/DayRoute";

export const sidebarItems: Array<SidebarItemProps> = [
    {
        title: "Calendar",
        icon: <Calendar />,
        route: CalendarRouteID,
    },
    {
        title: "Day",
        icon: <ViewDay />,
        route: DayRouteID,
    },
];
