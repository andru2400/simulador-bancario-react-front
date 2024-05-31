import { useContext } from "react";
import { FirstContext } from "./FirstProvider";

export const UseFirst = () => {
    const context = useContext(FirstContext);
    if (!context) {
        throw new Error("UseFirst must be used within a FirstProvider");
    }
    return context;
};
