import React from "react";

import { TextArea } from "@adobe/react-spectrum";

import { useFieldBase } from "./useFieldBase";

type TextAreaFieldProps = {
    name: string;
} & React.ComponentProps<typeof TextArea>;

const stringToValue = (value: string) => value;

const valueToString = (value: string) => value;

export const TextAreaField = ({ name, ...other }: TextAreaFieldProps) => {
    const field = useFieldBase({ name, stringToValue, valueToString });

    return <TextArea {...other} {...field} />;
};
