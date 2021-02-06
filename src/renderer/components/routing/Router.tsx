import React, { useCallback, useRef, useState } from "react";

import isEqual from "lodash/isEqual";
import invariant from "tiny-invariant";

import { Route, RouteID, RoutingContext } from "./RoutingContext";

export type RouterProps = {
    defaultRoute: RouteID | Route;
};

const toRoute = (input: RouteID | Route) => (typeof input === "string" ? { id: input } : input);

export const Router: React.FC<RouterProps> = ({ children, defaultRoute }) => {
    const [currentRoute, setCurrentRoute] = useState<Route>(() => toRoute(defaultRoute));

    const history = useRef<Array<Route>>([toRoute(defaultRoute)]);
    const historyPoint = useRef(0);

    const goTo = useCallback((id: RouteID | Route) => {
        const route: Route = toRoute(id);

        setCurrentRoute((lastRoute) => {
            if (lastRoute.id !== route.id || !isEqual(lastRoute.parameters, route.parameters)) {
                history.current.splice(historyPoint.current + 1, Infinity, route);
                historyPoint.current++;
            }

            return route;
        });
    }, []);

    const back = useCallback(() => {
        const prevRoute = history.current[historyPoint.current - 1];

        invariant(prevRoute, "Unable to go back");

        historyPoint.current--;

        setCurrentRoute(prevRoute);
    }, []);

    const forward = useCallback(() => {
        const nextRoute = history.current[historyPoint.current + 1];

        invariant(nextRoute, "Unable to go forward");

        historyPoint.current++;

        setCurrentRoute(nextRoute);
    }, []);

    const canGoBack = useCallback(() => historyPoint.current - 1 >= 0, []);

    const canGoForward = useCallback(() => historyPoint.current + 1 < history.current.length, []);

    const bag = { currentRoute, goTo, back, forward, canGoBack, canGoForward };

    return <RoutingContext.Provider value={bag}>{children}</RoutingContext.Provider>;
};
