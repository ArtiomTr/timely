import React from "react";

import { Item, Picker, Text } from "@adobe/react-spectrum";
import { useField } from "formik";

export type PickerItem<T> = { value: T; label: string; icon: React.ReactNode; description: string };

type PickerFieldProps<T extends React.Key> = {
    name: string;
    items: Array<PickerItem<T>>;
} & Omit<
    React.ComponentProps<typeof Picker>,
    "items" | "onSelectionChange" | "selectedKey" | "defaultSelectedKey" | "children"
>;

export const PickerField = <T extends React.Key>({
    name,
    items,
    ...other
}: PickerFieldProps<T>) => {
    const [{ value }, , { setValue }] = useField<T>({ name });

    return (
        <Picker
            {...other}
            items={items}
            onSelectionChange={setValue}
            selectedKey={value.toString()}
        >
            {({ value, icon, label, description }) => (
                <Item aria-label={label} textValue={label} key={value}>
                    {icon}
                    <Text>{label}</Text>
                    <Text slot="description">{description}</Text>
                </Item>
            )}
        </Picker>
    );
};
