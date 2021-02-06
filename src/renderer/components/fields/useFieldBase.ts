import React, { useCallback, useEffect, useState } from "react";

import { useField } from "formik";

export type FieldBaseProps<T> = {
    name: string;
    valueToString: (value: T) => string;
    stringToValue: (str: string) => T;
};

export const useFieldBase = <T>({ name, valueToString, stringToValue }: FieldBaseProps<T>) => {
    const [{ value }, , { setValue }] = useField({ name });

    const [stringifiedValue, setStringifiedValue] = useState("");

    useEffect(() => {
        setStringifiedValue(valueToString(value));
    }, [value, valueToString]);

    const onChange = useCallback((value: string) => setStringifiedValue(value), []);

    const onBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => setValue(stringToValue(e.target.value)),
        [setValue, stringToValue]
    );

    return {
        onChange,
        onBlur,
        value: stringifiedValue,
    };
};
