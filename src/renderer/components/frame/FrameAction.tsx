import React from "react";

import clsx from "clsx";

import styles from "./FrameAction.m.scss";

export const MenuBarAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    className,
    ...other
}) => (
    <button {...other} className={clsx(styles["action"], className)}>
        {children}
    </button>
);
