import React, { useCallback, useState } from "react";

import { ActionButton, Flex, Heading, Text } from "@adobe/react-spectrum";
import { ArrowLeftIcon, ArrowRightIcon } from "@primer/octicons-react";
import moment from "moment";

import styles from "./Calendar.m.scss";
import { CalendarCell } from "./CalendarCell";
import { toMonthDay } from "../utils/toMonthDay";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const enToNormal = (weekday: number) => (weekday - 1 >= 0 ? weekday - 1 : 6);

export const Calendar = () => {
    const [monthBegginging, setMonthBegginging] = useState(new Date());

    const todayDate = moment(new Date());

    const today = moment(monthBegginging).month() === todayDate.month() ? todayDate.day() : -1;

    const firstDayOfMonth = enToNormal(moment(monthBegginging).startOf("month").get("weekday"));

    const dayCount = moment(monthBegginging).daysInMonth();

    const weekCount = Math.ceil((firstDayOfMonth + dayCount) / 7);

    console.log(firstDayOfMonth);

    const nextMonth = useCallback(() => {
        setMonthBegginging((old) => moment(old).add(1, "month").toDate());
    }, []);

    const prevMonth = useCallback(() => {
        setMonthBegginging((old) => moment(old).subtract(1, "month").toDate());
    }, []);

    return (
        <React.Fragment>
            <Flex alignItems="center">
                <ActionButton onPress={prevMonth}>
                    <ArrowLeftIcon />
                </ActionButton>
                <Heading marginX="size-200" level={1}>
                    {moment(monthBegginging).format("YYYY MMMM")}
                </Heading>
                <ActionButton onPress={nextMonth}>
                    <ArrowRightIcon />
                </ActionButton>
            </Flex>
            <table className={styles["calendar"]}>
                <thead className={styles["calendar-head"]}>
                    <tr>
                        {weekdays.map((weekday, key) => (
                            <th key={key}>
                                <Text>{weekday}</Text>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles["calendar-body"]}>
                    {new Array(weekCount).fill(0).map((_, week) => (
                        <tr key={week}>
                            {new Array(7).fill(0).map((_, weekday) => (
                                <CalendarCell
                                    day={toMonthDay(week, weekday, firstDayOfMonth)}
                                    monthDaysCount={dayCount}
                                    today={today}
                                    activity={Math.random()}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
};