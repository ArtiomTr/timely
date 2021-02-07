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
} from "@adobe/react-spectrum";
import FolderOpen from "@spectrum-icons/workflow/FolderOpen";
import { Form, FormikProvider, useFormik } from "formik";
import { object, string } from "yup";

import { NotificationType } from "src/shared/api";
import { useCallbackContext } from "../CallbackContext";
import { ErrorMessage } from "../ErrorMessage";
import { TextField } from "../fields/TextField";
import { usePopup } from "../PopupContext";

export const NewProjectID = "new-project";

export const NewProjectForm = () => {
    const formikBag = useFormik({
        initialValues: {
            folder: "",
            title: "",
            message: "",
        },
        validationSchema: object().shape({
            folder: string().required(),
            title: string().required(),
        }),
        onSubmit: ({ folder, title }) => window.api.createProject(folder, title),
    });

    const { setFieldValue, setFieldError, errors } = formikBag;

    const { subscribeToError, subscribeToSuccess } = useCallbackContext();

    const [isOpen, , dismiss] = usePopup(NewProjectID);

    useEffect(() => {
        window.api.subscribeToFolderPicken((folder) => setFieldValue("folder", folder));

        const errorCleanup = subscribeToError((type, error) => {
            if (type === NotificationType.NEW_PROJECT) {
                setFieldError("message", error);
            }
        });
        const successCleanup = subscribeToSuccess((type) => {
            if (type === NotificationType.NEW_PROJECT) {
                dismiss();
            }
        });

        return () => {
            errorCleanup();
            successCleanup();
        };
    }, [setFieldValue, setFieldError, subscribeToError, dismiss, subscribeToSuccess]);

    return (
        <DialogTrigger isOpen={isOpen}>
            <React.Fragment />
            <FormikProvider value={formikBag}>
                <Form>
                    <Dialog onDismiss={dismiss} width="size-6000">
                        <Heading>Create new project</Heading>
                        <Divider />
                        <Content>
                            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                            <Flex direction="column">
                                <Flex alignItems="end">
                                    <TextField
                                        name="folder"
                                        width="100%"
                                        label="Project path"
                                        isRequired
                                    />
                                    <ActionButton
                                        onPress={() => window.api.pickFolder()}
                                        margin="0 0 0 10px"
                                    >
                                        <FolderOpen />
                                    </ActionButton>
                                </Flex>
                                <TextField
                                    isRequired
                                    name="title"
                                    width="100%"
                                    label="Project title"
                                />
                            </Flex>
                        </Content>
                        <ButtonGroup>
                            <Button variant="secondary" onPress={dismiss}>
                                Cancel
                            </Button>
                            <Button variant="cta" type="submit" onPress={dismiss}>
                                Create
                            </Button>
                        </ButtonGroup>
                    </Dialog>
                </Form>
            </FormikProvider>
        </DialogTrigger>
    );
};