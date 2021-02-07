import React, { createContext, useState } from "react";

import { useSafeContext } from "./utils/useSafeContext";

type PopupContextType = {
    shownPopup: string | undefined;
    setShownPopup: (value: string | undefined) => void;
};

export const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopupContext = () => useSafeContext(PopupContext);

type PopupBag = [visible: boolean, show: () => void, dismiss: () => void];

export const usePopup = (popupId: string): PopupBag => {
    const { shownPopup, setShownPopup } = usePopupContext();

    return [shownPopup === popupId, () => setShownPopup(popupId), () => setShownPopup(undefined)];
};

export const PopupProvider: React.FC = ({ children }) => {
    const [shownPopup, setShownPopup] = useState<string | undefined>(undefined);

    window.openPopup = setShownPopup;

    return (
        <PopupContext.Provider value={{ shownPopup, setShownPopup }}>
            {children}
        </PopupContext.Provider>
    );
};
