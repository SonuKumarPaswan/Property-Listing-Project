
import React,{createContext} from "react";

export const GlobalContext=createContext();

const  GlobalProvider=({children})=>{
    return(
        <GlobalContext.Provider value="Hllo from Global Context">
            {children}
        </GlobalContext.Provider>       
    )};

export default GlobalProvider;
