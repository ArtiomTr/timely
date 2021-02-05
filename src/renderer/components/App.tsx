import React from "react";

import { darkTheme, Provider, View } from "@adobe/react-spectrum";

import { Calendar } from "./calendar/Calendar";
import { Frame } from "./frame/Frame";
import { AppContextProvider } from "./AppContext";

export const App = () => (
    <Provider theme={darkTheme}>
        <AppContextProvider>
            <Frame>
                <View paddingX={20} paddingY={10}>
                    <Calendar />
                </View>
            </Frame>
        </AppContextProvider>
    </Provider>
);
