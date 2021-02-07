import React, { useCallback, useEffect, useState } from "react";

import { useField } from "formik";

export type FieldBaseProps<T> = {
    name: string;
    valueToString: (value: T) => string;
    stringToValue: (str: string) => T;
};

type FieldBag = {
    onChange: (value: string) => void;
    onBlur: (e: React.FocusEvent) => void;
    value: string;
    validationState?: "invalid" | "valid";
};

export const useFieldBase = <T>({
    name,
    valueToString,
    stringToValue,
}: FieldBaseProps<T>): FieldBag => {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField({ name });

    const [stringifiedValue, setStringifiedValue] = useState("");

    useEffect(() => {
        setStringifiedValue(valueToString(value));
    }, [value, valueToString]);

    const onChange = useCallback((value: string) => setStringifiedValue(value), []);

    const onBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setValue(stringToValue(e.target.value));
            setTouched(true);
        },
        [setValue, setTouched, stringToValue]
    );

    return {
        onChange,
        onBlur,
        value: stringifiedValue,
        validationState: touched ? (error ? "invalid" : "valid") : undefined,
    };
};
