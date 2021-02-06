import React from "react";

import { Heading, Text, View } from "@adobe/react-spectrum";
import { Formik } from "formik";
import moment from "moment";

import { useAppContext } from "../AppContext";
import { TogglableHoursField } from "../fields/TogglabeHoursField";
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
    const { totalTime, begin, setTotalTime } = useStopwatchContext();

    const { project } = useAppContext();

    const isToday = parameters.day === undefined;

    const day = isToday ? moment(new Date()).startOf("day") : moment(parameters.day);

    return (
        <Formik
            initialValues={{
                hours:
                    (project?.activityMap[dateToDay(day.toDate())] || 0) +
                    +(isToday && totalTime.current + msFromPoint(begin)),
            }}
            onSubmit={({ hours }) => setTotalTime(hours)}
        >
            <View>
                <View marginBottom="size-300">
                    <Heading marginBottom={0} level={1}>
                        {day.format("MMMM Do")}
                    </Heading>
                    <Text>{day.format("YYYY.MM.DD")}</Text>
                </View>
                <TogglableHoursField name="hours" label="Working time" />
            </View>
        </Formik>
    );
};
