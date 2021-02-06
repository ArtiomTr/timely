import React from "react";

import { Flex } from "@adobe/react-spectrum";
import Calendar from "@spectrum-icons/workflow/Calendar";

export const Sidebar = () => (
    <Flex direction="column">
        <button>
            <Calendar />
        </button>
    </Flex>
);
