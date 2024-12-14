import { createContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const UserContext =  createContext()

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({children}){
    
    const [token, setToken] = useState(localStorage.getItem("token"));
    return <UserContext.Provider value={{token , setToken}}>
        {children}
    </UserContext.Provider>
}