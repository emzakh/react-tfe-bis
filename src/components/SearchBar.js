import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';


const Search = () => {
 

    const [searchTerm, setSearchTerm] = useState("");
    const [fusion, setFusion] = useState([]);
    //const fusion = [];
  
  
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
   // item.nom.includes(searchTerm.toLowerCase()) || item.titre.includes(searchTerm.toLowerCase())

    

  return (
    <>
    <div className="search-container">
      <input className="search-input" type="text" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value);}}/>
      
        {
        fusion.filter((item) => {
            if (searchTerm === "") {                
              return null;              
            } else if (item.nom === undefined){
                    if(item.titre.toLowerCase().includes(searchTerm.toLowerCase())){
                        return item;
                    }                
            } else if (item.titre === undefined){
                    if(item.nom.toLowerCase().includes(searchTerm.toLowerCase())){
                        return item;
                    }
                }
            }
          )
          .map((item) => (          
            <div className="search-result" key={item.id}>                
            
            <Link to={`/produits/${item.id}`}>{item.nom}</Link>
            <Link to={`/recettes/${item.id}`}>{item.titre}</Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Search;
