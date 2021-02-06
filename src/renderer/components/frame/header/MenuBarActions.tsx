import React from "react";

import { actions } from "./actions";
import { MenuBarAction } from "./MenuBarAction";

export const MenuBarActions = () => (
    <React.Fragment>
        {actions.map((action, key) => (
            <MenuBarAction {...action} key={key} />
        ))}
    </React.Fragment>
);
