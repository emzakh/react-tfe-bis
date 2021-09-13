import React, { useState, useEffect }from 'react';
// import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import { useLoginContext } from "../contexts/LoginContext";
import axios from 'axios';


export default function EditProfile(props) {

    // const users = TestConsoleLogUsers(); 
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
          const fetchItem = await axios.get(
            `http://localhost:8000/api/users/${user.id}`
          );
          const dataItem = await fetchItem.data;
          setItem(dataItem);
        //   console.log(dataItem);
        };
        fetchItem();
      }, [user.id]);

      console.log(item)

    return (
    //    <div>

    // {users &&
    // <ul>
    //     {console.log(users)}

    // {users['hydra:member'].map((user)=>
    //     <li>
    //         <p>
    //             <span>{user.firstName}</span>
    //             <span>{user.lastName}</span>
    //             <span>{user.email}</span>
    //         </p>           
    //     </li>
    // )}
    
    // </ul>
    // }

    //    </div> 

   //    const ingredients = Object.keys(item.ingredients).map((ig) => (
    //     <Ingredient
    //     key={ig}
    //     nom={item.ingredients[ig].nom}
    //     image={item.ingredients[ig].image} />
    //   ));

    // nom={item.commentaires[com].author.fullName}

        <div>
            {/* {user.firstName}
            {user.lastName} */}
            {Object.keys(item.commentaires).map((commentaire, index)=>(
                <div>
                    Commentaire : 
                    {item.commentaires[commentaire].contenu}
                </div>
            ))}
            {item.email}
            
        </div>

    );
}