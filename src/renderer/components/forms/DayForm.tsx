import React, { useCallback, useState } from "react";

import { ActionButton, Flex, Text, View } from "@adobe/react-spectrum";
import Checkmark from "@spectrum-icons/workflow/Checkmark";
import Close from "@spectrum-icons/workflow/Close";
import Edit from "@spectrum-icons/workflow/Edit";
import { Form, FormikProvider, useFormik } from "formik";

import { DayActivity } from "src/shared/api";
import { useAppContext } from "../AppContext";
import { HoursField } from "../fields/HoursField";
import { TextAreaField } from "../fields/TextAreaField";

export type DayFormProps = {
    initial: DayActivity;
    day: number;
};

export const DayForm = ({ initial, day }: DayFormProps) => {
    const { setDayActivity } = useAppContext();

    const formikBag = useFormik({
        initialValues: initial,
        onSubmit: (activity) => setDayActivity(day, activity),
        enableReinitialize: true,
    });

    const { submitForm, resetForm } = formikBag;

    const [isEditing, setIsEditing] = useState(false);

    const edit = useCallback(() => setIsEditing(true), []);

    const save = useCallback(() => {
        setIsEditing(false);
        submitForm();
    }, [submitForm]);

    const reset = useCallback(() => {
        setIsEditing(false);
        resetForm();
    }, [resetForm]);

    return (
        <FormikProvider value={formikBag}>
            <Form>
                <Flex direction="column" justifyContent="start">
                    <HoursField isDisabled={!isEditing} name="hours" label="Working time" />
                    <TextAreaField isDisabled={!isEditing} name="description" label="Description" />
                    <View marginTop="size-150">
                        {isEditing ? (
                            <React.Fragment>
                                <ActionButton onPress={save}>
                                    <Checkmark />
                                    <Text>Save</Text>
                                </ActionButton>
                                <ActionButton type="reset" marginX="size-150" onPress={reset}>
                                    <Close />
                                    <Text>Cancel</Text>
                                </ActionButton>
                            </React.Fragment>
                        ) : (
                            <ActionButton onPress={edit}>
                                <Edit />
                                <Text>Edit</Text>
                            </ActionButton>
                        )}
                    </View>
                </Flex>
            </Form>
        </FormikProvider>
    );
};
