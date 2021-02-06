import React from "react";

import clsx from "clsx";

import classes from "./SidebarItem.m.scss";
import { Link } from "../../routing/Link";
import { RouteID } from "../../routing/RoutingContext";

export type SidebarItemProps = {
    title?: string;
    icon: React.ReactNode;
    route: RouteID;
};

export const SidebarItem = ({ title, icon, route }: SidebarItemProps) => (
    <Link to={route}>
        {(onClick, selected) => (
            <button
                className={clsx(classes["item"], selected && classes["item_selected"])}
                title={title}
                onClick={onClick}
            >
                {icon}
            </button>
        )}
    </Link>
);
