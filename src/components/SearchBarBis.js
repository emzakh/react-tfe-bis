import React, { useState } from "react";
import {Link} from 'react-router-dom';


function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {

        if (searchWord === "") {                
            return null;              
          } else if (value.nom === undefined){
                  if(value.titre.toLowerCase().includes(searchWord.toLowerCase())){                     
                      return value;                
                  }                
          } else if (value.titre === undefined){
                  if(value.nom.toLowerCase().includes(searchWord.toLowerCase())){                   
                      return value;
                  }
              }

 
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };


  return (





    <div className="search">
      <div className="searchInputs">   
      <input type="text" className="input-search" placeholder={placeholder} value={wordEntered} onChange={handleFilter} /> 
      </div>
 

      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank" rel="noreferrer">           
          
                <Link to={`/produits/${value.id}`}>{value.nom}</Link>

                <Link to={`/recettes/${value.id}`}>{value.titre}</Link>               
             
               
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;