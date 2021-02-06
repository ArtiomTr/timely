import React from "react";

import { useRoutingContext } from "./useRoutingContext";

type RouteProps<T> = {
    id: string;
    component?: React.ComponentType<T>;
    children?: (parameters: Record<string, unknown>) => React.ReactNode;
} & Omit<T, "parameters">;

export const Route = <T,>({ id, children, component: Component, ...other }: RouteProps<T>) => {
    const { currentRoute } = useRoutingContext();

    if (currentRoute.id !== id) return <React.Fragment />;

    const parameters = currentRoute.parameters ?? {};

    return (
        <React.Fragment>
            {children ? (
                children({})
            ) : Component ? (
                <Component parameters={parameters} {...((other as unknown) as T)} />
            ) : null}
        </React.Fragment>
    );
};
