import React from "react";

import { Button, Item, Menu, MenuTrigger, Section, Text } from "@adobe/react-spectrum";

import classes from "./MenuBarAction.m.scss";

export type SubAction = {
    title: string;
    icon: React.ReactNode;
    execute: () => void;
};

export type ActionGroup = {
    title?: string;
    subactions: Array<SubAction>;
};

export type Action = {
    title: string;
    groups: Array<ActionGroup>;
};

export const MenuBarAction = ({ title, groups }: Action) => (
    <React.Fragment>
        <MenuTrigger>
            <Button UNSAFE_className={classes["action"]} variant="primary" isQuiet>
                {title}
            </Button>
            <Menu
                onAction={(key) => {
                    if (typeof key === "string") {
                        const [groupIndex, actionIndex] = key.split("_");

                        const executeFn =
                            groups[parseInt(groupIndex)].subactions[parseInt(actionIndex)].execute;

                        executeFn();
                    }
                }}
            >
                {groups.map((group, groupIndex) => (
                    <Section key={groupIndex} title={group.title}>
                        {group.subactions.map((action, actionIndex) => (
                            <Item textValue={action.title} key={`${groupIndex}_${actionIndex}`}>
                                {action.icon}
                                <Text>{action.title}</Text>
                            </Item>
                        ))}
                    </Section>
                ))}
            </Menu>
        </MenuTrigger>
    </React.Fragment>
);
