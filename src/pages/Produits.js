import React from 'react';
import Logo from '../components/Logo';

import Navigation from '../components/Navigation';

import Produits from '../components/Produits';

const Produit = () =>{
    return (
        <div className="produit">
            <Navigation/>
            <Logo/>           
            <Produits/>
            
        </div>
    )
}

export default Produit