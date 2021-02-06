import React, { createContext, useEffect, useState } from "react";

import { AppState } from "src/shared/api";
import { useSafeContext } from "./utils/useSafeContext";
import { AppSplashScreen } from "./AppSplashScreen";

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppContext = () => useSafeContext(AppContext);

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
