import React, {useState,useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import Pagination from "./Pagination";

const Produits = ({produits}) => {
  const [data, setData] = useState([]); 
  const [selectedRadio, setSelectedRadio] = useState('');
  const radios = ['Jardin','Epices','Potager'];
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const handlePageChange = (page) => {
      setCurrentPage(page)
  }

  const paginatedProd = Pagination.getData(produits, currentPage, itemsPerPage)



  useEffect(() => {
    axios
      .get(
      `http://localhost:8000/api/produits?pagination=true&count=${itemsPerPage}&page=${currentPage}`
      )
      .then(res => res.data['hydra:member'])
      .then(data => setData(data))    
  }, [currentPage]);

  const filtered = () => {
    return data.filter((produit)=> produit.categorie.includes(selectedRadio))
  }


  return (
    <div className="produits">
      <div className="sort-container">
        <ul>        
          {radios.map((radio)=>{
            return(
              <li key={radio}>
                <input type="radio" value={radio} id={radio} checked={radio === selectedRadio} onChange={(e)=>setSelectedRadio(e.target.value)} onClick={filtered}/>
                <label htmlFor={radio}>{radio}</label>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && <h5 onClick={()=>setSelectedRadio("")}>Annuler filtre</h5>}
      </div>
        <ul className="produits-list">
            {           
           paginatedProd.map((produit)=>(
              <Card produit={produit} key={produit.nom}/>
            ))}
        </ul>
        { itemsPerPage < produits.length &&
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={produits.length}
                        onPageChanged={handlePageChange}
                        filtered
                    />
                }
    </div>
    );
};

export default Produits;