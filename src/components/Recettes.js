import React, { useState, useEffect } from "react";
import axios from "axios";
import CardRecette from "./CardRecette";
import Pagination from "./Pagination";

const Recettes = () => {
  const [data, setData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Plat", "Boisson", "Dessert", "All"];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  //Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://hildegarde.massimino.be/api/recettes")
      .then((res) => res.data["hydra:member"])
      .then((data) => setData(data));
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 12;

  const filterProduit = data.filter((recette) =>
    recette.types.includes(selectedRadio)
  );
  const paginatedData = Pagination.getData(
    filterProduit,
    currentPage,
    itemsPerPage
  );

  const handleSelectFilter = (event) => {
    const value = event.currentTarget.value;    
    if(value === "All"){
      setSelectedRadio("")
    }else{
      setSelectedRadio(value);
    } 
    setCurrentPage(1);
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
                  checked={radio === selectedRadio}
                  onChange={handleSelectFilter}
                />
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
      <ul className="produits-list">
        {paginatedData
          .filter((recette) => {
            if (searchTerm === "") {
              return recette;
            } else if (
              recette.titre.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return recette;
            }
          })
          .map((recette) => (
            <CardRecette recette={recette} key={recette.titre} />
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

export default Recettes;
