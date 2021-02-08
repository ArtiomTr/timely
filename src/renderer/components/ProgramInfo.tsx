import React from "react";

import {
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Flex,
    Heading,
    Text,
} from "@adobe/react-spectrum";

import { usePopup } from "./PopupContext";

export const ProgramInfoID = "program-info";

export const ProgramInfo = () => {
    const [visible, , dismiss] = usePopup(ProgramInfoID);

    return (
        <DialogTrigger isDismissable isOpen={visible}>
            <React.Fragment />
            <Dialog onDismiss={dismiss}>
                <Heading>Timely info</Heading>
                <Divider />
                <Content>
                    <Flex direction="column">
                        <Text>Version: 0.0.1</Text>
                        <Text>Built with Electron.</Text>
                        <Text>Copyright Artiom Tretjakovas {new Date().getFullYear()}</Text>
                    </Flex>
                </Content>
            </Dialog>
        </DialogTrigger>
    );
};
