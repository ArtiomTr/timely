import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";

import { ActionButton, Flex, Text, View } from "@adobe/react-spectrum";
import Pause from "@spectrum-icons/workflow/Pause";
import Play from "@spectrum-icons/workflow/Play";
import moment from "moment-timezone";

const getTotalTime = (point: Date | undefined, time: number) =>
    time + (point === undefined ? 0 : new Date().getTime() - point.getTime());

export const Stopwatch = () => {
    const [, forceUpdate] = useReducer((value) => ++value, 0);

    const begin = useRef<Date | undefined>(undefined);
    const time = useRef(0);

    const toggle = useCallback(() => {
        if (begin.current === undefined) {
            begin.current = new Date();
        } else {
            time.current = getTotalTime(begin.current, time.current);
            begin.current = undefined;
        }
    }, []);

    useEffect(() => {
        setInterval(forceUpdate, 105);
    }, []);

    return (
        <Flex alignItems="center">
            <ActionButton onPress={toggle}>
                {begin.current !== undefined ? <Pause /> : <Play />}
            </ActionButton>
            <Text marginX="size-100">
                {moment(getTotalTime(begin.current, time.current)).tz("utc").format("HH:mm:ss:SS")}
            </Text>
        </Flex>
    );
};
