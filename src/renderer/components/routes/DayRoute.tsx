import React from "react";

import { Heading, View } from "@adobe/react-spectrum";
import moment from "moment";

export const DayRouteID = "day";

type DayRouteProps = {
    parameters: {
        day?: Date;
    };
};

export const DayRoute = ({ parameters }: DayRouteProps) => (
    <View>
        <Heading>{moment(parameters.day ?? new Date()).format("YYYY MM DD")}</Heading>
    </View>
);
