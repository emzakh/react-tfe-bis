import React from 'react';
import { NavLink } from "react-router-dom"

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to ="/" activeClassName="nav-active">
                Accueil
            </NavLink>

            <NavLink exact to ="/a-propos" activeClassName="nav-active">
                A propos
            </NavLink>

            <NavLink exact to ="/produits" activeClassName="nav-active">
                Produits
            </NavLink>

            <NavLink exact to ="/recettes" activeClassName="nav-active">
                Recettes
            </NavLink>
        </div>
    );
};

export default Navigation;