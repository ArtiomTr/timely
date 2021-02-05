import React from "react";

import { Grid, View } from "@adobe/react-spectrum";

import { MenuBar } from "./MenuBar";
import { useAppContext } from "../AppContext";

export const Frame: React.FC = ({ children }) => {
    const context = useAppContext();

    const appTitle = context.project ? `Timely - ${context.project.title}` : `Timely`;

    document.title = appTitle;

    return (
        <Grid
            areas={["header", "content"]}
            rows={["size-400", "auto"]}
            height="100vh"
            gap="size-100"
        >
            <View borderBottomColor="seafoam-400" borderBottomWidth="thin" gridArea="header">
                <MenuBar appTitle={appTitle} />
            </View>
            <View gridArea="content">{children}</View>
        </Grid>
    );
};
