import React from "react";

import { Flex, ProgressCircle, View } from "@adobe/react-spectrum";
import clsx from "clsx";

import classes from "./AppSplashScreen.m.scss";

export type Props = {
    isLoad: boolean;
};

export const AppSplashScreen = ({ isLoad }: Props) => (
    <View
        UNSAFE_className={clsx(classes["splash-screen"], isLoad && classes["splash-screen_loaded"])}
        backgroundColor="seafoam-600"
    >
        <Flex width="100vw" height="100vh" justifyContent="center" alignItems="center">
            <ProgressCircle aria-label="Loading…" isIndeterminate variant="overBackground" />
        </Flex>
    </View>
);
