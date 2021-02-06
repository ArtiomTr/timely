import { RoutingContext } from "./RoutingContext";
import { useSafeContext } from "../utils/useSafeContext";

export const useRoutingContext = () => useSafeContext(RoutingContext);
