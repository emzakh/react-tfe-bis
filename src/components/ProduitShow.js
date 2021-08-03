import React, {useState,useEffect} from "react";
import axios from "axios";
import Card from "./Card";

const ProduitShow = (produit) => {
  const [data, setData] = useState([]); 

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/api/produits"
      )
      .then(res => res.data['hydra:member'])
      .then(data => setData(data))    
  }, []);


  return (
    <div className="produits">

   
        <ul className="produits-list">
          {produit.nom}
        </ul>

    </div>
    );
};

export default ProduitShow;