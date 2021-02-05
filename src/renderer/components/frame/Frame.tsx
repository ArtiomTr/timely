import React from "react";

import { Grid, View } from "@adobe/react-spectrum";

import { MenuBar } from "./MenuBar";

export const Frame: React.FC = ({ children }) => (
    <Grid areas={["header", "content"]} rows={["size-300", "auto"]} height="100vh" gap="size-100">
        <View backgroundColor="seafoam-400" gridArea="header">
            <MenuBar />
        </View>
        <View gridArea="content">{children}</View>
    </Grid>
);
