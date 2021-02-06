import React from "react";

import { View } from "@adobe/react-spectrum";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";
import ChevronRight from "@spectrum-icons/workflow/ChevronRight";

import classes from "./NavigationButtons.m.scss";
import { useRoutingContext } from "../../routing/useRoutingContext";

export const NavigationButtons = () => {
    const { canGoBack, canGoForward, back, forward } = useRoutingContext();

    return (
        <View>
            <button className={classes["action"]} disabled={!canGoBack()} onClick={back}>
                <ChevronLeft size="S" />
            </button>
            <button className={classes["action"]} disabled={!canGoForward()} onClick={forward}>
                <ChevronRight size="S" />
            </button>
        </View>
    );
};
