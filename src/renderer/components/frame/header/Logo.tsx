import React from "react";

import { View } from "@adobe/react-spectrum";
import Stopwatch from "@spectrum-icons/workflow/Stopwatch";

export const Logo = () => (
    <View paddingX="size-100" paddingY={5}>
        <Stopwatch size="S" color="seafoam-400" />
    </View>
);
