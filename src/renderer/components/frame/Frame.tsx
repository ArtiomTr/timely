import React from "react";

import { Grid, View } from "@adobe/react-spectrum";

import { MenuBar } from "./header/MenuBar";
import { Sidebar } from "./sidebar/Sidebar";
import { useAppContext } from "../AppContext";

export const Frame: React.FC = ({ children }) => {
    const context = useAppContext();

    const appTitle = context.project ? `Timely - ${context.project.title}` : `Timely`;

    document.title = appTitle;

    return (
        <Grid
            areas={["header header", "sidebar content"]}
            columns={["size-800", "auto"]}
            rows={["size-400", "auto"]}
            height="100vh"
        >
            <View gridArea="sidebar" backgroundColor="gray-75">
                <Sidebar />
            </View>
            <View borderBottomColor="seafoam-400" borderBottomWidth="thin" gridArea="header">
                <MenuBar appTitle={appTitle} />
            </View>
            <View gridArea="content">{children}</View>
        </Grid>
    );
};
