import React from "react";

import Add from "@spectrum-icons/workflow/Add";
import BoxExport from "@spectrum-icons/workflow/BoxExport";
import Branch1 from "@spectrum-icons/workflow/Branch1";
import FolderOpen from "@spectrum-icons/workflow/FolderOpen";
import Info from "@spectrum-icons/workflow/Info";
import LogOut from "@spectrum-icons/workflow/LogOut";
import Search from "@spectrum-icons/workflow/Search";
import Settings from "@spectrum-icons/workflow/Settings";

import { Action } from "./MenuBarAction";
import { ExportFormID } from "../../forms/ExportForm";
import { NewProjectFormID } from "../../forms/NewProjectForm";

export const actions: Array<Action> = [
    {
        title: "File",
        groups: [
            {
                title: "Project",
                subactions: [
                    {
                        title: "Create new project",
                        icon: <Add size="S" />,
                        execute: () => window.openPopup(NewProjectFormID),
                    },
                    {
                        title: "Open project",
                        icon: <FolderOpen size="S" />,
                        execute: () => window.api.openProject(),
                    },
                    {
                        title: "Export",
                        icon: <BoxExport size="S" />,
                        execute: () => window.openPopup(ExportFormID),
                    },
                ],
            },
            {
                subactions: [
                    {
                        title: "Settings",
                        icon: <Settings size="S" />,
                        execute: () => {
                            console.log("settings");
                        },
                    },
                    {
                        title: "Exit",
                        icon: <LogOut size="S" />,
                        execute: () => {
                            console.log("exit");
                        },
                    },
                ],
            },
        ],
    },
    {
        title: "Help",
        groups: [
            {
                subactions: [
                    {
                        title: "Search",
                        icon: <Search size="S" />,
                        execute: () => {
                            console.log("search");
                        },
                    },
                ],
            },
            {
                title: "About",
                subactions: [
                    {
                        title: "GitHub repo",
                        icon: <Branch1 size="S" />,
                        execute: () => {
                            console.log("github");
                        },
                    },
                    {
                        title: "Program info",
                        icon: <Info size="S" />,
                        execute: () => {
                            console.log("info");
                        },
                    },
                ],
            },
        ],
    },
];
