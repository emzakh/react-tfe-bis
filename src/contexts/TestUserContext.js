import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

 const TestUserContext = createContext(null)

 export function GetAllUsers(props){

    const [users, setUsers] = useState();

    useEffect(()=>{
        axios.get('http://localhost:8000/api/users')
        .then(response => setUsers(response.data));
    },[])
    
    return(
        <TestUserContext.Provider value={users}>
            {props.children}
        </TestUserContext.Provider>

    )

 }

 export function TestConsoleLogUsers() {
     return useContext(TestUserContext);
 }