import React, { useState, useRef, useEffect } from "react";
import {Link} from 'react-router-dom';


function SearchHomeBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const myRef = useRef(null);

  
  useEffect(()=>{
    // console.log(myRef.current)
    // on contourne react en faisant du JS pour faire passer le focusout qui ne fonctionne pas sur react        
    myRef.current.addEventListener('focusout', ()=>{
    
    // console.log('salut')
    setTimeout(()=>{
      setWordEntered("")
      setFilteredData([])

    }, 400)

    })
  },[])


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

    <div className="searchHome">
      <div className="searchHomeInputs">   
      <input type="text" className="input-home-search" placeholder={placeholder} value={wordEntered} onChange={handleFilter} ref={myRef} /> 
      </div>
 

      {filteredData.length !== 0 && (
        <div className="HomeDataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="HomeDataItem" href={value.link} target="_blank" rel="noreferrer">           

              {value.nom && (
                <Link to={`/produits/${value.id}`}>{value.nom}</Link>
              )}

              {value.titre && (
                <Link to={`/recettes/${value.id}`}>{value.titre}</Link>
              )}             
               
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchHomeBar;