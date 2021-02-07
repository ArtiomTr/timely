import React from "react";
import ReactDOM from "react-dom";

import "./normalize.css";

import { Api } from "src/shared/api";
import { App } from "./components/App";

declare global {
    interface Window {
        api: Api;
        openPopup: (popupId: string) => void;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("app")
);
