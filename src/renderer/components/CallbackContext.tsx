import React, { createContext, useCallback, useEffect, useRef } from "react";

import { NotificationType } from "src/shared/api";
import { useSafeContext } from "./utils/useSafeContext";

type CallbackContextType = {
    subscribeToSuccess: (callback: (type: NotificationType) => void) => () => void;
    subscribeToError: (callback: (type: NotificationType, errorText: string) => void) => () => void;
};

const CallbackContext = createContext<CallbackContextType | undefined>(undefined);

export const useCallbackContext = () => useSafeContext(CallbackContext);

export const CallbackProvider: React.FC = ({ children }) => {
    const callbacksRef = useRef<{
        onSuccess: Array<(type: NotificationType) => void>;
        onError: Array<(type: NotificationType, errorText: string) => void>;
    }>({
        onSuccess: [],
        onError: [],
    });

    const subscribeToSuccess = useCallback((callback: (type: NotificationType) => void) => {
        callbacksRef.current.onSuccess.push(callback);

        return () => {
            const indexOf = callbacksRef.current.onSuccess.indexOf(callback);

            if (indexOf !== -1) {
                callbacksRef.current.onSuccess.splice(indexOf, 1);
            }
        };
    }, []);

    const subscribeToError = useCallback(
        (callback: (type: NotificationType, errorText: string) => void) => {
            callbacksRef.current.onError.push(callback);

            return () => {
                const indexOf = callbacksRef.current.onError.indexOf(callback);

                if (indexOf !== -1) {
                    callbacksRef.current.onError.splice(indexOf, 1);
                }
            };
        },
        []
    );

    useEffect(() => {
        window.api.subscribeToNotifications(
            (type) => callbacksRef.current.onSuccess.forEach((callback) => callback(type)),
            (type, errorText) =>
                callbacksRef.current.onError.forEach((callback) => callback(type, errorText))
        );
    }, []);

    return (
        <CallbackContext.Provider
            value={{
                subscribeToError,
                subscribeToSuccess,
            }}
        >
            {children}
        </CallbackContext.Provider>
    );
};
