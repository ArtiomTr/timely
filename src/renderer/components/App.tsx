import React from "react";

import { darkTheme, Provider, View } from "@adobe/react-spectrum";

import { Frame } from "./frame/Frame";
import { CalendarRoute, CalendarRouteID } from "./routes/CalendarRoute";
import { DayRoute, DayRouteID } from "./routes/DayRoute";
import { SettingsRoute, SettingsRouteID } from "./routes/SettingsRoute";
import { Route } from "./routing/Route";
import { Router } from "./routing/Router";
import { AppContextProvider } from "./AppContext";
import { StopwatchProvider } from "./StopwatchContext";

export const App = () => (
    <Provider theme={darkTheme}>
        <AppContextProvider>
            <StopwatchProvider>
                <Router defaultRoute={DayRouteID}>
                    <Frame>
                        <View paddingX={20} paddingY={10}>
                            <Route id={CalendarRouteID} component={CalendarRoute} />
                            <Route id={SettingsRouteID} component={SettingsRoute} />
                            <Route id={DayRouteID} component={DayRoute} />
                        </View>
                    </Frame>
                </Router>
            </StopwatchProvider>
        </AppContextProvider>
    </Provider>
);
