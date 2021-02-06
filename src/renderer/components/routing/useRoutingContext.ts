import { useContext } from "react";

import invariant from "tiny-invariant";

import { RoutingContext } from "./RoutingContext";

export const useRoutingContext = () => {
    const context = useContext(RoutingContext);

    invariant(context, "Trying to access routing context outside Router");

    return context;
};
