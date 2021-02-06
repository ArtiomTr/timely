import { Context, useContext } from "react";

import invariant from "tiny-invariant";

export const useSafeContext = <T>(context: Context<T | undefined>): T => {
    const unsafeContext = useContext(context);

    invariant(
        unsafeContext,
        `Trying to access ${context.displayName ?? "context"} outside provider.`
    );

    return unsafeContext;
};
