import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
export const GlobalContext = createContext("initialState");

let data = {
    theme: "light",
    user: null,
    classId: null,
    docs: [],
    eof: false,
    err: null,
    api: window.location.href.includes("localhost") ?
        "http://localhost:8080/api/v1/"
        :
        "https://education-portal-server-xi.vercel.app/api/v1/"
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
