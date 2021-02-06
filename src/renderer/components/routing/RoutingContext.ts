import { createContext } from "react";

export type RouteID = string;

export type Route = {
    id: RouteID;
    parameters?: Record<string, unknown>;
};

export type RoutingContextType = {
    currentRoute: Route;
    goTo: (id: RouteID | Route) => void;
    back: () => void;
    forward: () => void;
    canGoBack: () => boolean;
    canGoForward: () => boolean;
};

export const RoutingContext = createContext<RoutingContextType | undefined>(undefined);
