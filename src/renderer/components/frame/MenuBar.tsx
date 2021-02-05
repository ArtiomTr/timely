import React, { useEffect, useState } from "react";

import { Flex, Text, View } from "@adobe/react-spectrum";
import {
    HorizontalRuleIcon,
    ScreenFullIcon,
    ScreenNormalIcon,
    XIcon,
} from "@primer/octicons-react";

import styles from "./MenuBar.m.scss";
import { MenuBarAction } from "./MenuBarAction";

const closeWindow = () => {
    window.api.closeWindow();
};

const maximize = () => {
    window.api.toggleMaximize();
};

const minimize = () => {
    window.api.minimize();
};

export const MenuBar = () => {
    const [maximized, setMaximized] = useState(false);

    useEffect(() => {
        const observer = (newMaximized: boolean) => setMaximized(newMaximized);

        window.api.subscribeToMaximize(observer);
    }, []);

    return (
        <Flex
            direction="row"
            height="100%"
            width="100%"
            justifyContent="space-between"
            UNSAFE_className={styles["menu-bar"]}
        >
            <View></View>
            <View>
                <Text>Timely</Text>
            </View>
            <View>
                <MenuBarAction onClick={minimize}>
                    <HorizontalRuleIcon />
                </MenuBarAction>
                <MenuBarAction onClick={maximize}>
                    {maximized ? <ScreenNormalIcon /> : <ScreenFullIcon />}
                </MenuBarAction>
                <MenuBarAction onClick={closeWindow}>
                    <XIcon />
                </MenuBarAction>
            </View>
        </Flex>
    );
};
