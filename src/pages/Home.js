import React from 'react';


import Search from '../components/Search';
import { TestConsoleLogUsers } from "../contexts/TestUserContext";

const Home = () =>{

 const user = TestConsoleLogUsers();
 console.log('UserHomepage',user)




    return (
        <div className="home">              
            
            <h1>Salut ! C'est la homepage !</h1>
            <Search/>



        </div>
    )
}

export default Home