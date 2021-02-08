import React from "react";

import { Switch } from "@adobe/react-spectrum";
import { useField } from "formik";

type SwitchFieldProps = {
    name: string;
    label?: string;
};

export const SwitchField = ({ name, label }: SwitchFieldProps) => {
    const [{ value }, , { setValue }] = useField<boolean>({ name });

    return (
        <Switch isSelected={Boolean(value)} onChange={setValue}>
            {label}
        </Switch>
    );
};
