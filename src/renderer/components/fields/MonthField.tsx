import React from "react";

import { TextField } from "@adobe/react-spectrum";
import moment from "moment";

import { useFieldBase } from "./useFieldBase";

type MonthFieldProps = {
    name: string;
} & React.ComponentProps<typeof TextField>;

const valueToString = (date: Date) => {
    const valueAsMoment = moment(date);

    if (valueAsMoment.isValid()) {
        return valueAsMoment.format("YYYY-MM");
    }

    return "";
};

const stringToValue = (str: string) => {
    const arr = str.split(/[./-]/g);

    if (arr.length >= 2) {
        const [yearStr, monthStr] = arr;

        const year = parseInt(yearStr);
        const month = parseInt(monthStr);

        if (!isNaN(year) && !isNaN(month)) {
            return new Date(year, month - 1);
        }
    }

    return null;
};

export const MonthField = ({ name, ...other }: MonthFieldProps) => {
    const field = useFieldBase({ name, valueToString, stringToValue });

    return <TextField {...other} {...field} />;
};
