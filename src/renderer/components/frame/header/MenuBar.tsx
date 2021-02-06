import React from "react";

import { Flex, Text } from "@adobe/react-spectrum";

import { FrameActions } from "./FrameActions";
import styles from "./MenuBar.m.scss";
import { MenuBarActions } from "./MenuBarActions";
import { NavigationButtons } from "./NavigationButtons";

export type MenuBarProps = {
    appTitle: string;
};

export const MenuBar = ({ appTitle }: MenuBarProps) => (
    <Flex
        direction="row"
        height="100%"
        width="100%"
        justifyContent="space-between"
        UNSAFE_className={styles["menu-bar"]}
    >
        <Flex>
            <NavigationButtons />
            <MenuBarActions />
        </Flex>
        <Flex justifyContent="center" alignItems="center">
            <Text>{appTitle}</Text>
        </Flex>
        <FrameActions />
    </Flex>
);
