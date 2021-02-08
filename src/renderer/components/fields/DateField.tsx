import React from "react";

import { TextField } from "@adobe/react-spectrum";
import moment from "moment";

import { useFieldBase } from "./useFieldBase";

export type DateFieldProps = {
    name: string;
} & React.ComponentProps<typeof TextField>;

const dateFormats = ["YYYY.MM.DD", "YYYY-MM-DD", "YYYY/MM/DDD"];

const valueToString = (value: Date) => {
    const valueAsMoment = moment(value, dateFormats, true);

    if (valueAsMoment.isValid()) return valueAsMoment.format("YYYY.MM.DD");

    return "";
};

const stringToValue = (value: string) => {
    const valueAsMoment = moment(value, dateFormats, true);

    if (valueAsMoment.isValid()) {
        return valueAsMoment.toDate();
    }

    return null;
};

export const DateField = ({ name, ...other }: DateFieldProps) => {
    const field = useFieldBase({ name, valueToString, stringToValue });

    return <TextField {...other} {...field} />;
};
