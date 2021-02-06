import React, { useCallback, useEffect, useRef, useState } from "react";

import { ActionButton, Flex, TextField } from "@adobe/react-spectrum";
import Checkmark from "@spectrum-icons/workflow/Checkmark";
import Edit from "@spectrum-icons/workflow/Edit";
import { useFormikContext } from "formik";

import { FieldBaseProps, useFieldBase } from "./useFieldBase";

export type TogglableFieldProps<T> = FieldBaseProps<T> & React.ComponentProps<typeof TextField>;

export const TogglableField = <T,>({
    name,
    stringToValue,
    valueToString,
    ...other
}: TogglableFieldProps<T>) => {
    const [disabled, setDisabled] = useState(true);

    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (!disabled) inputRef.current?.focus();
    }, [disabled]);

    const { submitForm } = useFormikContext();

    const toggle = useCallback(
        () =>
            setDisabled((old) => {
                if (!old) {
                    submitForm();
                }

                return !old;
            }),
        [submitForm]
    );

    const { onBlur, onChange, value } = useFieldBase({ name, stringToValue, valueToString });

    return (
        <Flex alignItems="center">
            <TextField
                {...other}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={(inputRef as unknown) as React.ComponentProps<typeof TextField>["ref"]}
                isDisabled={disabled}
            />
            <ActionButton onPress={toggle} marginTop={24} marginX="size-150">
                {disabled ? <Edit /> : <Checkmark />}
            </ActionButton>
        </Flex>
    );
};
