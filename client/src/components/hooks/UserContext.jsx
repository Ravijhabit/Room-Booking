import { useState, createContext, useEffect } from "react";
import axios from 'axios';
export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    // useEffect(()=>{
    //     if(!user){
    //         console.log('everytime');
    //         axios.get('/').then(({data})=>{
    //             setUser(data);
    //         });
    //     }
    // },[]);
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
