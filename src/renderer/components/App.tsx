import React from "react";

import { darkTheme, Provider, View } from "@adobe/react-spectrum";

import { Calendar } from "./calendar/Calendar";
import { Frame } from "./frame/Frame";

export const App = () => (
    <Provider theme={darkTheme}>
        <Frame>
            <View paddingX={20} paddingY={10}>
                <Calendar />
            </View>
        </Frame>
    </Provider>
);
