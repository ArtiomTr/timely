import React, { createContext, useCallback, useRef, useState } from "react";

import moment from "moment";

import { dateToDay } from "./utils/dateToDay";
import { msFromPoint } from "./utils/msFromPoint";
import { useSafeContext } from "./utils/useSafeContext";
import { useAppContext } from "./AppContext";

type StopwatchContextType = {
    begin: Date | undefined;
    totalTime: Readonly<React.MutableRefObject<number>>;
    start: () => void;
    stop: () => void;
    setTotalTime: (time: number) => void;
};

const StopwatchContext = createContext<StopwatchContextType | undefined>(undefined);

export const useStopwatchContext = () => useSafeContext(StopwatchContext);

const day = dateToDay(moment(new Date()).startOf("day").toDate());

export const StopwatchProvider: React.FC = ({ children }) => {
    const [begin, setBegin] = useState<Date | undefined>(undefined);

    const {
        setDayActivity,
        state: { project },
    } = useAppContext();

    const totalTime = useRef(project?.activityMap[day].ms || 0);
    const beginRef = useRef(begin);
    beginRef.current = begin;

    const stop = useCallback(() => {
        if (beginRef.current !== undefined) {
            totalTime.current = totalTime.current + msFromPoint(beginRef.current);
            const ms = totalTime.current;

            setDayActivity(day, (old) => ({
                ...old,
                ms,
            }));
        }
        setBegin(undefined);
    }, [setDayActivity]);

    const start = useCallback(() => setBegin(new Date()), []);

    const setTotalTime = useCallback((time: number) => {
        totalTime.current = time;
    }, []);

    return (
        <StopwatchContext.Provider
            value={{
                begin: begin,
                totalTime,
                start,
                stop,
                setTotalTime,
            }}
        >
            {children}
        </StopwatchContext.Provider>
    );
};
