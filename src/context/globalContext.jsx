// GlobalContext.jsx

import { createContext } from "react";

export const mainContext = createContext();

export function GlobalContextProvider(props) {
    const API_URL = import.meta.env.VITE_API_URL;
    console.log(API_URL);

    return (
        <mainContext.Provider value={{ API_URL, newProp: "new" }}>
            {props.children}
        </mainContext.Provider>
    );
}

