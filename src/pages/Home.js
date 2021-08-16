import React from 'react';


import Navigation from '../components/Navigation';
import Search from '../components/Search';

const Home = () =>{
    return (
        <div className="home">
            <Navigation/>       
            
            <h1>Salut ! C'est la homepage !</h1>
            <Search/>
        </div>
    )
}

export default Home