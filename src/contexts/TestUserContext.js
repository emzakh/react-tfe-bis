
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useLoginContext } from "../contexts/LoginContext";

const TestUserContext = createContext(null)

 export function GetAllUsers(props){
     
   const user = useLoginContext();

    const [item, setItem] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        roles: [],
        commentaires: {},        
        recettes: {},
        presentation: "",   
      })

    useEffect(() => {
        const fetchItem = async () => {
            if(user!=null){
                const fetchItem = await axios.get(
                  `http://hildegarde.massimino.be/api/users/${user.id}`
                );
                const dataItem = await fetchItem.data;
                setItem(dataItem);
            }
        //   console.log(dataItem);
        };
        fetchItem();
      },[user]);
    
    return(
        <TestUserContext.Provider value={item}>
            {props.children}
        </TestUserContext.Provider>

    )

 }

 export function TestConsoleLogUsers() {
     return useContext(TestUserContext);
 }

