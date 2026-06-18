import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null)
    const[token,setToken]=useState(
        localStorage.getItem("token")||null
    )
    return(
        <AuthContext.Provider
        value={{user,setUser,token,setToken}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);