import React, { createContext, useContext, useEffect, useState } from "react";

import invariant from "tiny-invariant";

import { AppState } from "src/shared/api";
import { AppSplashScreen } from "./AppSplashScreen";

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);

    invariant(context, "Trying to access app context outside app context");

    return context;
};

export const AppContextProvider: React.FC = ({ children }) => {
    const [appConfig, setAppConfig] = useState<AppState | undefined>(undefined);

    useEffect(() => {
        let _isMounted = true;

        window.api.loadInitialAppState((config) => {
            if (_isMounted) {
                setAppConfig(config);
            }
        });

        return () => {
            _isMounted = false;
        };
    }, []);

    return (
        <React.Fragment>
            <AppSplashScreen isLoad={appConfig !== undefined} />

            {appConfig !== undefined && (
                <AppContext.Provider value={appConfig}>{children}</AppContext.Provider>
            )}
        </React.Fragment>
    );
};
