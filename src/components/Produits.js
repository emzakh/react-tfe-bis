import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Pagination from "./Pagination";

const Produits = () => {
  const [data, setData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Jardin", "Epices", "Potager", "All"];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((res) => res.data["hydra:member"])
      .then((data) => setData(data));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 12;

  const filterProduit = data.filter((produit) =>
    produit.categorie.includes(selectedRadio)
  );
  const paginatedData = Pagination.getData(
    filterProduit,
    currentPage,
    itemsPerPage
  );

  const handleSelectFilter = (event) => {
    const value = event.currentTarget.value;    
    if(value === "All"){
      // setSelectedRadio("Tous les produits")
      setSelectedRadio("")
     
    }else{
      setSelectedRadio(value);
    } 
    setCurrentPage(1);
    // console.log(setSelectedRadio)
  };

 
  return (
    <div className="produits">
      <div className="sort-container">
        <ul>
          {radios.map((radio) => {
            return (
              <li key={radio}>
                <input
                  type="radio"
                  value={radio}
                  id={radio}
                  name="choice" // remplace mon truc checked debilos. Radio != checkbox
                  onChange={handleSelectFilter}
                />
                {console.log(radio)}
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
  

      {/* SEARCH BAR */}

      <div className="search-box">
    <button className="btn-search"><i className="fas fa-search"></i></button>
    <input type="text" className="input-search" placeholder="Rechercher..." onChange={(event) => {setSearchTerm(event.target.value);}}/>
  </div>

      {/* <input className="searchProduct" type="text" placeholder="Search..." onChange={(event) => {setSearchTerm(event.target.value);}}/> */}

      <ul className="produits-list">
        {paginatedData
          .filter((produit) => {
            if (searchTerm === "") {
              return produit;
            } else if (
              produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return produit;
            }
          })
          .map((produit) => (
            <Card produit={produit} key={produit.nom} />
          ))}
      </ul>

      {itemsPerPage < filterProduit.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filterProduit.length}
          onPageChanged={handlePageChange}
        />
      )}
    </div>
  );
};

export default Produits;
