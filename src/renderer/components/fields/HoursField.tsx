import React from "react";

import { TextField } from "@adobe/react-spectrum";

import { useFieldBase } from "./useFieldBase";
import { hoursToMs, msToHours } from "../utils/msToHours";

type HoursFieldProps = {
    name: string;
} & React.ComponentProps<typeof TextField>;

const stringToValue = (value: string) => {
    value = value.replace(/h/g, "").replace(/,/g, ".");

    return hoursToMs(parseFloat(value));
};

const valueToString = (value: number) => `${msToHours(value)} h`;

export const HoursField = ({ name, ...other }: HoursFieldProps) => {
    const field = useFieldBase({ name, stringToValue, valueToString });

    return <TextField {...other} {...field} />;
};
