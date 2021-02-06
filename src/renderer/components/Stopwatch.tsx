import React from "react";

import { ActionButton, Flex, Text } from "@adobe/react-spectrum";
import Pause from "@spectrum-icons/workflow/Pause";
import Play from "@spectrum-icons/workflow/Play";

import { useStopwatchContext } from "./StopwatchContext";
import { StopwatchTime } from "./StopwatchTime";

export const Stopwatch = () => {
    const { toggle, begin } = useStopwatchContext();

    return (
        <Flex alignItems="center">
            <ActionButton onPress={toggle}>
                {begin !== undefined ? <Pause /> : <Play />}
            </ActionButton>
            <Text marginX="size-100">
                <StopwatchTime />
            </Text>
        </Flex>
    );
};
