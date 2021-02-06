import React, { useCallback } from "react";

import { Route, RouteID } from "./RoutingContext";
import { useRoutingContext } from "./useRoutingContext";

export type LinkProps<T> = {
    component?: React.ComponentType<T>;
    to: RouteID | Route;
    children?: (onClick: () => void, selected?: boolean) => React.ReactNode;
} & Omit<T, "onClick" | "selected">;

export const Link = <T,>({ component: Component, to, children, ...other }: LinkProps<T>) => {
    const { goTo, currentRoute } = useRoutingContext();

    const go = useCallback(() => goTo(to), [to, goTo]);

    const selected = currentRoute.id === to;

    return (
        <React.Fragment>
            {children ? (
                children(go, selected)
            ) : Component ? (
                <Component onClick={go} selected={selected} {...((other as unknown) as T)} />
            ) : null}
        </React.Fragment>
    );
};
