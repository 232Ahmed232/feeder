import React, { useState } from 'react';
import useUser from './useUser';


const  Userprovider = ({childeren})=>{
    const [user,setUser] = useState("")
    return (
        <useUser.Provider value={{user,setUser}}>
            {childeren}
        </useUser.Provider>
    );
}

export default Userprovider;