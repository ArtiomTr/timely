import React, { useEffect, useState } from "react";

import { Flex, Text, View } from "@adobe/react-spectrum";
import CloseIcon from "@spectrum-icons/workflow/Close";
import MaximizeIcon from "@spectrum-icons/workflow/Maximize";
import MinimizeIcon from "@spectrum-icons/workflow/Minimize";
import RemoveIcon from "@spectrum-icons/workflow/Remove";

import { FrameAction } from "./FrameAction";
import { Logo } from "./Logo";
import styles from "./MenuBar.m.scss";
import { MenuBarActions } from "./MenuBarActions";

const closeWindow = () => {
    window.api.closeWindow();
};

const maximize = () => {
    window.api.toggleMaximize();
};

const minimize = () => {
    window.api.minimize();
};

export type MenuBarProps = {
    appTitle: string;
};

export const MenuBar = ({ appTitle }: MenuBarProps) => {
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
            <Flex>
                <Logo />
                <MenuBarActions />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
                <Text>{appTitle}</Text>
            </Flex>
            <View>
                <FrameAction onClick={minimize}>
                    <RemoveIcon size="S" />
                </FrameAction>
                <FrameAction onClick={maximize}>
                    {maximized ? <MinimizeIcon size="S" /> : <MaximizeIcon size="S" />}
                </FrameAction>
                <FrameAction onClick={closeWindow}>
                    <CloseIcon size="S" />
                </FrameAction>
            </View>
        </Flex>
    );
};
