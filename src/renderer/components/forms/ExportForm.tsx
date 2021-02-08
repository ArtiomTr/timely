import React, { useEffect } from "react";

import {
    ActionButton,
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Flex,
    Heading,
    Item,
} from "@adobe/react-spectrum";
import { Tabs } from "@react-spectrum/tabs";
import Brackets from "@spectrum-icons/workflow/Brackets";
import Data from "@spectrum-icons/workflow/Data";
import FileCSV from "@spectrum-icons/workflow/FileCSV";
import Folder from "@spectrum-icons/workflow/Folder";
import { Form, FormikErrors, FormikProvider, useFormik } from "formik";
import moment from "moment";

import { ExportType, NotificationType } from "src/shared/api";
import { useCallbackContext } from "../CallbackContext";
import { ErrorMessage } from "../ErrorMessage";
import { DateField } from "../fields/DateField";
import { MonthField } from "../fields/MonthField";
import { PickerField, PickerItem } from "../fields/PickerField";
import { TextField } from "../fields/TextField";
import { usePopup } from "../PopupContext";
import { dateToDay } from "../utils/dateToDay";

export const ExportFormID = "export-form";

const exportItems: Array<PickerItem<number>> = [
    {
        value: ExportType.JSON,
        label: ".json",
        description: "Export data as JSON format",
        icon: <Brackets size="S" />,
    },
    {
        value: ExportType.CSV,
        label: ".csv",
        description: "Export data as CSV format",
        icon: <FileCSV size="S" />,
    },
    {
        value: ExportType.XLS,
        label: ".xlsx",
        description: "Export data to Excel",
        icon: <Data size="S" />,
    },
];

const exportTypeToExtension = {
    [ExportType.JSON]: "json",
    [ExportType.CSV]: "csv",
    [ExportType.XLS]: "xlsx",
};

export const ExportForm = () => {
    const formikBag = useFormik({
        initialValues: {
            custom_range: false,
            from: moment(new Date()).startOf("month").toDate(),
            till: moment(new Date()).endOf("month").toDate(),
            month: new Date(),
            path: "",
            message: "",
            export_type: ExportType.XLS,
        },
        validate: (values) => {
            const errors: FormikErrors<typeof values> = {};

            const isEmpty = (str: string) => !(str.trim().length > 0);

            if (isEmpty(values.path)) {
                errors.path = "Required";
            }

            if (values.custom_range) {
                if (values.from === null) {
                    errors.from = "Required";
                }

                if (values.till === null) {
                    errors.till = "Required";
                }
            } else if (values.month === null) {
                errors.month = "Required";
            }

            return errors;
        },
        onSubmit: ({ path, from, till, export_type, month, custom_range }) => {
            let fromDay: number, tillDay: number;

            if (custom_range) {
                fromDay = dateToDay(from);
                tillDay = dateToDay(moment(till).endOf("day").toDate());
            } else {
                fromDay = dateToDay(moment(month).startOf("month").toDate());
                tillDay = dateToDay(moment(month).endOf("month").toDate());
            }

            window.api.exportData(
                `${path}.${exportTypeToExtension[export_type]}`,
                fromDay,
                tillDay,
                export_type
            );
        },
    });

    const { errors, values, setFieldValue, setFieldError } = formikBag;

    const [visible, , dismiss] = usePopup(ExportFormID);

    const { subscribeToError, subscribeToSuccess } = useCallbackContext();

    useEffect(() => {
        window.api.onExportFilePicked((path) => {
            setFieldValue("path", path.substring(0, path.lastIndexOf(".")));
        });
    }, [setFieldValue]);

    useEffect(
        () =>
            subscribeToError((type, error) => {
                if (type === NotificationType.EXPORT) {
                    setFieldError("message", error);
                }
            }),
        [setFieldError, subscribeToError]
    );

    useEffect(
        () =>
            subscribeToSuccess((type) => {
                if (type === NotificationType.EXPORT) {
                    dismiss();
                }
            }),
        [dismiss, subscribeToSuccess]
    );

    return (
        <DialogTrigger isOpen={visible}>
            <React.Fragment />
            <FormikProvider value={formikBag}>
                <Form>
                    <Dialog onDismiss={dismiss} width="size-6000">
                        <Heading>Export project</Heading>
                        <Divider />
                        <Content>
                            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                            <Flex alignItems="end">
                                <TextField isRequired label="Path" flex={1} name="path" />
                                <PickerField
                                    width={110}
                                    marginX="size-100"
                                    menuWidth="size-3000"
                                    items={exportItems}
                                    name="export_type"
                                />
                                <ActionButton
                                    onPress={() => {
                                        window.api.pickExportFile(values.export_type);
                                    }}
                                >
                                    <Folder />
                                </ActionButton>
                            </Flex>
                            <Tabs
                                selectedKey={Number(values.custom_range).toString()}
                                onSelectionChange={(item) => {
                                    setFieldValue("custom_range", Boolean(+item));
                                }}
                            >
                                <Item title="Month" key="0">
                                    <Content>
                                        <MonthField
                                            isRequired
                                            width="100%"
                                            name="month"
                                            label="Month"
                                        />
                                    </Content>
                                </Item>
                                <Item title="Custom range" key="1">
                                    <Content>
                                        <Flex direction="column">
                                            <DateField
                                                isRequired
                                                width="100%"
                                                name="from"
                                                label="From"
                                            />
                                            <DateField
                                                isRequired
                                                width="100%"
                                                name="till"
                                                label="Till"
                                            />
                                        </Flex>
                                    </Content>
                                </Item>
                            </Tabs>
                        </Content>
                        <ButtonGroup>
                            <Button variant="secondary" type="reset" onPress={dismiss}>
                                Cancel
                            </Button>
                            <Button variant="cta" type="submit">
                                Export
                            </Button>
                        </ButtonGroup>
                    </Dialog>
                </Form>
            </FormikProvider>
        </DialogTrigger>
    );
};
