import React from "react";

import { Text, View } from "@adobe/react-spectrum";
import AlertCircle from "@spectrum-icons/workflow/AlertCircle";

import classes from "./ErrorMessage.m.scss";

export const ErrorMessage: React.FC = ({ children }) => (
    <View
        UNSAFE_className={classes["message"]}
        borderColor="negative"
        borderRadius="regular"
        borderWidth="thick"
        paddingX="size-100"
        paddingY="size-150"
        marginY="size-100"
    >
        <AlertCircle size="S" color="negative" />
        <Text marginX="size-75">{children}</Text>
    </View>
);
