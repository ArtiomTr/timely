import React from "react";

import { Grid, View } from "@adobe/react-spectrum";

import { MenuBar } from "./MenuBar";

export const Frame: React.FC = ({ children }) => (
    <Grid areas={["header", "content"]} rows={["size-400", "auto"]} height="100vh" gap="size-100">
        <View borderBottomColor="seafoam-400" borderBottomWidth="thin" gridArea="header">
            <MenuBar />
        </View>
        <View gridArea="content">{children}</View>
    </Grid>
);
