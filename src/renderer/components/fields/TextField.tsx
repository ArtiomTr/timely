import React from "react";

import { TextField as SpectrumTextField } from "@adobe/react-spectrum";

import { useFieldBase } from "./useFieldBase";

export type TextFieldProps = {
    name: string;
} & React.ComponentProps<typeof SpectrumTextField>;

const valueToString = (value: string) => value;

const stringToValue = (string: string) => string;

export const TextField = ({ name, ...other }: TextFieldProps) => {
    const field = useFieldBase({
        name,
        valueToString,
        stringToValue,
    });

    return <SpectrumTextField {...other} {...field} />;
};
