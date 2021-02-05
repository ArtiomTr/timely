import React, { useEffect, useState } from "react";

import { Flex, Text, View } from "@adobe/react-spectrum";
import CloseIcon from "@spectrum-icons/workflow/Close";
import MaximizeIcon from "@spectrum-icons/workflow/Maximize";
import MinimizeIcon from "@spectrum-icons/workflow/Minimize";
import RemoveIcon from "@spectrum-icons/workflow/Remove";

import { MenuBarAction } from "./FrameAction";
import styles from "./MenuBar.m.scss";

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
            <Flex justifyContent="center" alignItems="center">
                <Text>Timely</Text>
            </Flex>
            <View>
                <MenuBarAction onClick={minimize}>
                    <RemoveIcon size="S" />
                </MenuBarAction>
                <MenuBarAction onClick={maximize}>
                    {maximized ? <MinimizeIcon size="S" /> : <MaximizeIcon size="S" />}
                </MenuBarAction>
                <MenuBarAction onClick={closeWindow}>
                    <CloseIcon size="S" />
                </MenuBarAction>
            </View>
        </Flex>
    );
};
