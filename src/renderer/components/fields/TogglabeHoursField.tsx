import React from "react";

import { TextField } from "@adobe/react-spectrum";

import { TogglableField } from "./TogglableField";
import { hoursToMs, msToHours } from "../utils/msToHours";

type TogglableHoursFieldProps = {
    name: string;
} & React.ComponentProps<typeof TextField>;

const stringToValue = (value: string) => {
    value = value.replace(/h/g, "").replace(/,/g, ".");

    return hoursToMs(parseFloat(value));
};

const valueToString = (value: number) => `${msToHours(value)} h`;

export const TogglableHoursField = (props: TogglableHoursFieldProps) => (
    <TogglableField stringToValue={stringToValue} valueToString={valueToString} {...props} />
);
