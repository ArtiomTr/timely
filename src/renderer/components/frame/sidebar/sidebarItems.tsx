import React from "react";

import Calendar from "@spectrum-icons/workflow/Calendar";
import Settings from "@spectrum-icons/workflow/Settings";
import ViewDay from "@spectrum-icons/workflow/ViewDay";

import { SidebarItemProps } from "./SidebarItem";
import { CalendarRouteID } from "../../routes/CalendarRoute";
import { DayRouteID } from "../../routes/DayRoute";
import { SettingsRouteID } from "../../routes/SettingsRoute";

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
    {
        title: "Settings",
        icon: <Settings />,
        route: SettingsRouteID,
    },
];
