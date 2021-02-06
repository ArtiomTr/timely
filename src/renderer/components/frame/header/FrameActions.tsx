import React, { useEffect, useState } from "react";

import { View } from "@adobe/react-spectrum";
import Close from "@spectrum-icons/workflow/Close";
import Maximize from "@spectrum-icons/workflow/Maximize";
import Minimize from "@spectrum-icons/workflow/Minimize";
import Remove from "@spectrum-icons/workflow/Remove";

import { FrameAction } from "./FrameAction";

const closeWindow = () => {
    window.api.closeWindow();
};

const maximize = () => {
    window.api.toggleMaximize();
};

const minimize = () => {
    window.api.minimize();
};

export const FrameActions = () => {
    const [maximized, setMaximized] = useState(false);

    useEffect(() => {
        const observer = (newMaximized: boolean) => setMaximized(newMaximized);

        window.api.subscribeToMaximize(observer);
    }, []);

    return (
        <View>
            <FrameAction onClick={minimize}>
                <Remove size="S" />
            </FrameAction>
            <FrameAction onClick={maximize}>
                {maximized ? <Minimize size="S" /> : <Maximize size="S" />}
            </FrameAction>
            <FrameAction onClick={closeWindow}>
                <Close size="S" />
            </FrameAction>
        </View>
    );
};
