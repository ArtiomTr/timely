import React from "react";

import { darkTheme, Provider, View } from "@adobe/react-spectrum";

import { ExportForm } from "./forms/ExportForm";
import { NewProjectForm } from "./forms/NewProjectForm";
import { Frame } from "./frame/Frame";
import { CalendarRoute, CalendarRouteID } from "./routes/CalendarRoute";
import { DayRoute, DayRouteID } from "./routes/DayRoute";
import { Route } from "./routing/Route";
import { Router } from "./routing/Router";
import { AppContextProvider } from "./AppContext";
import { CallbackProvider } from "./CallbackContext";
import { PopupProvider } from "./PopupContext";
import { ProgramInfo } from "./ProgramInfo";
import { StopwatchProvider } from "./StopwatchContext";

export const App = () => (
    <Provider theme={darkTheme}>
        <AppContextProvider>
            <CallbackProvider>
                <PopupProvider>
                    <StopwatchProvider>
                        <NewProjectForm />
                        <ExportForm />
                        <ProgramInfo />
                        <Router defaultRoute={CalendarRouteID}>
                            <Frame>
                                <View paddingX={20} paddingY={10}>
                                    <Route id={CalendarRouteID} component={CalendarRoute} />
                                    <Route id={DayRouteID} component={DayRoute} />
                                </View>
                            </Frame>
                        </Router>
                    </StopwatchProvider>
                </PopupProvider>
            </CallbackProvider>
        </AppContextProvider>
    </Provider>
);
