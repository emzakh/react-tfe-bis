import React from 'react';
import Logo from '../components/Logo';

import Navigation from '../components/Navigation';
import Produits from '../components/Produits';

const Home = () =>{
    return (
        <div className="home">
            <Navigation/>
            <Logo/>
            <Produits/>
        </div>
    )
}

export default Home