import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import Logo from './Logo';
import SearchBarBis from './SearchBarBis';
import axios from "axios"


const Navigation = () => {

    const [fusion, setFusion] = useState([]);
    useEffect(() => {
      axios
        .all([
          axios.get("http://localhost:8000/api/produits"),
          axios.get("http://localhost:8000/api/recettes"),
        ])
        .then(
          axios.spread((obj1, obj2) => {
            setFusion([
              ...obj1.data["hydra:member"],
              ...obj2.data["hydra:member"],
            ])             
          })
        );
    }, []);

    return (
        <div className="navigation">    

            <NavLink exact to ="/" activeClassName="nav-active">
                Home
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

            <NavLink exact to ="/auth" activeClassName="nav-active">
                Login
            </NavLink>
            <NavLink exact to ="/register" activeClassName="nav-active">
                Register
            </NavLink>

            <SearchBarBis placeholder="Recherche..." data={fusion} />
        </div>
    );
};

export default Navigation;