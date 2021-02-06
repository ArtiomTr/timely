import React, { createContext, useCallback, useEffect, useState } from "react";

import { AppState, DayActivity } from "src/shared/api";
import { useSafeContext } from "./utils/useSafeContext";
import { AppSplashScreen } from "./AppSplashScreen";

type AppContextType = {
    state: AppState;
    setDayActivity: (day: number, action: DayActivity) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => useSafeContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
    const [appState, setAppState] = useState<AppState | undefined>(undefined);

    useEffect(() => {
        let _isMounted = true;

        window.api.loadInitialAppState((config) => {
            if (_isMounted) {
                setAppState(config);
            }
        });

        return () => {
            _isMounted = false;
        };
    }, []);

    const setDayActivity = useCallback(
        (day: number, activity: DayActivity) =>
            setAppState((state) => {
                if (state === undefined || state.project === undefined) return state;

                state.project.activityMap[day] = activity;

                return {
                    ...state,
                };
            }),
        []
    );

    return (
        <React.Fragment>
            <AppSplashScreen isLoad={appState !== undefined} />

            {appState !== undefined && (
                <AppContext.Provider value={{ state: appState, setDayActivity }}>
                    {children}
                </AppContext.Provider>
            )}
        </React.Fragment>
    );
};
