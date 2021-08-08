import React from 'react';
import Logo from '../components/Logo';

import Navigation from '../components/Navigation';

import Recettes from '../components/Recettes';

const Recette = () =>{
    return (
        <div className="recette">
            <Navigation/>
            <Logo/>           
            <Recettes/>
            
        </div>
    )
}

export default Recette