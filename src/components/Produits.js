import React, {useState,useEffect} from "react";
import axios from "axios";
import Card from "./Card";

const Produits = () => {
  const [data, setData] = useState([]); 
  const [selectedRadio, setSelectedRadio] = useState('');
  const radios = ['Jardin','Epices','Potager'];

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
      <div className="sort-container">
        <ul>        
          {radios.map((radio)=>{
            return(
              <li key={radio}>
                <input type="radio" value={radio} id={radio} checked={radio === selectedRadio} onChange={(e)=>setSelectedRadio(e.target.value)}/>
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
            data
            .filter((produit)=> produit.categorie.includes(selectedRadio))
            .map((produit)=>(
              <Card produit={produit} key={produit.nom}/>
            ))}
        </ul>

    </div>
    );
};

export default Produits;