import React from "react";

import { Heading, Text, View } from "@adobe/react-spectrum";
import moment from "moment";

import { useAppContext } from "../AppContext";
import { DayForm } from "../forms/DayForm";
import { useStopwatchContext } from "../StopwatchContext";
import { dateToDay } from "../utils/dateToDay";
import { msFromPoint } from "../utils/msFromPoint";

export const DayRouteID = "day";

type DayRouteProps = {
    parameters: {
        day?: Date;
    };
};

export const DayRoute = ({ parameters }: DayRouteProps) => {
    const { totalTime, begin } = useStopwatchContext();

    const {
        state: { project },
    } = useAppContext();

    const isToday = parameters.day === undefined;

    const day = isToday ? moment(new Date()).startOf("day") : moment(parameters.day);

    const dayIndex = dateToDay(day.toDate());

    const savedActivity = project?.activityMap[dayIndex];

    return (
        <View>
            <View marginBottom="size-300">
                <Heading marginBottom={0} level={1}>
                    {day.format("MMMM Do")}
                </Heading>
                <Text>{day.format("YYYY.MM.DD")}</Text>
            </View>
            <DayForm
                day={dayIndex}
                initial={
                    savedActivity || {
                        hours: +(isToday && totalTime.current + msFromPoint(begin)),
                        description: "",
                    }
                }
            />
        </View>
    );
};
