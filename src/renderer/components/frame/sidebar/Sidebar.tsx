import React from "react";

import { Flex } from "@adobe/react-spectrum";

import { SidebarItem } from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

export const Sidebar = () => (
    <Flex direction="column">
        {sidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
        ))}
    </Flex>
);
