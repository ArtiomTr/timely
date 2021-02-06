import React, { createContext, useCallback, useRef, useState } from "react";

import { msFromPoint } from "./utils/msFromPoint";
import { useSafeContext } from "./utils/useSafeContext";

type StopwatchContextType = {
    begin: Date | undefined;
    totalTime: Readonly<React.MutableRefObject<number>>;
    toggle: () => void;
    setTotalTime: (time: number) => void;
};

const StopwatchContext = createContext<StopwatchContextType | undefined>(undefined);

export const useStopwatchContext = () => useSafeContext(StopwatchContext);

export const StopwatchProvider: React.FC = ({ children }) => {
    const [begin, setBegin] = useState<Date | undefined>(undefined);

    const totalTime = useRef(0);

    const toggle = useCallback(() => {
        setBegin((old) => {
            if (old === undefined) {
                return new Date();
            } else {
                totalTime.current += msFromPoint(old);
                return undefined;
            }
        });
    }, []);

    const setTotalTime = useCallback((time: number) => (totalTime.current = time), []);

    return (
        <StopwatchContext.Provider
            value={{
                begin: begin,
                totalTime,
                toggle,
                setTotalTime,
            }}
        >
            {children}
        </StopwatchContext.Provider>
    );
};
