import axios from "axios";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { div } from "prelude-ls";

const ProduitDetail = ({ match }) => {
  const [item, setItem] = useState({
    nom: "",
    nomlatin: "",
    effets: "",
    description: "",
    categorie: "",
    image: "",
    recettesAssociees: [],
    saison: "",
    cultivation: "",
    conservation: "",
    apport: "",
    vitamine: "",
    bebe: "",
    nutriscore: "",
  });
  // const [item, setItem] = useState([]);
  useEffect(() => {
    const fetchItem = async () => {
      const fetchItem = await axios.get(
        `http://localhost:8000/api/produits/${match.params.id}`
      );
      const dataItem = await fetchItem.data;
      setItem(dataItem);
      console.log(dataItem);
    };
    fetchItem();
  }, [match.params.id]);




  return (
    <>
      <Logo />

      <div className="produit-container">
        <div className="produit-left">
          <h1>{item.nom}</h1>
          <h4>{item.nomlatin}</h4>

          <div className="produit-identite">
            {/* <div className="produit-row"> */}
            <div className="produit-col">
              <i className="fas fa-calendar"></i>
              <strong>Saison</strong>
              <span>{item.saison}</span>
            </div>

            <div className="produit-col">
              <i className="fas fa-calendar"></i>
              <strong>Cultivé</strong>
              <span>{item.cultivation}</span>
            </div>

            <div className="produit-col">
              <i className="fas fa-calendar"></i>
              <strong>Conservation</strong>
              <span>{item.conservation}</span>
            </div>

            <div className="produit-col">
              <i className="fas fa-calendar"></i>
              <strong>Apport</strong>
              <span>{item.apport}</span>
            </div>

            <div className="produit-col">
              <i className="fas fa-calendar"></i>
              <strong>Vitamine</strong>
              <span>{item.vitamine}</span>
            </div>

            <div className="produit-col">
              <i className="fas fa-calendar"></i>
              <strong>A partir de</strong>
              <span>{item.bebe}</span>
            </div>
            {/* </div> */}
          </div>

          <div className="nutriscore-icon">
            <i className="fas fa-calendar"></i>
            <strong>Nutriscore</strong>
          </div>

          <div className="nutriscore-wrapper">
            <div className={item.nutriscore === "A" ? "nutriscore-item active" : "nutriscore-item"}>
              <span>A</span>
            </div>
            <div className={item.nutriscore === "B" ? "nutriscore-item active" : "nutriscore-item"}>
              <span>B</span>
            </div>
            <div className={item.nutriscore === "C" ? "nutriscore-item active" : "nutriscore-item"}>
              <span>C</span>
            </div>
            <div className={item.nutriscore === "D" ? "nutriscore-item active" : "nutriscore-item"}>
              <span>D</span>
            </div>
            <div className={item.nutriscore === "E" ? "nutriscore-item active" : "nutriscore-item"}>
              <span>E</span>
            </div>
          </div>

          <div className="produit-effets">
            <h1>Effets</h1>
            {item.effets}
          </div>

          <div className="produit-avis">
            <h1>L'avis d'Hildegarde</h1>
            {item.description}
          </div>
        </div>

        <div className="produit-right">
          <img
            src={"/img/" + item.image}
            className="produit-img"
            alt="img-produit"
          />
      
      {item.recettesAssociees.length > 0 &&
       <div className="produit-recette-container">
       <h1>Recettes associées</h1>
   <div className="produit-recettes">
     {item.recettesAssociees.map((recette) => (
       <div key={recette.id}>
         <li className="card-produit-recette">
           <img src={"/img/" + recette.imgRecette} className="card-img-recette" alt="imagerecette"/>
           <Link to={`/recettes/${recette.id}`}>
             <div className="data-container">
               <ul>
                 <li>{recette.types}</li>
               </ul>
             </div>
             <div className="productNameCard">{recette.titre}</div>
           </Link>
         </li>
       </div>
     ))}
   </div>
   </div>
      }
           {item.recettesAssociees.length < 1 &&
     <div className="no-recette">  
       <strong>{item.nom}</strong> n'a pas encore de recette associée
       </div>
      }

    
            

        </div>
      </div>
    </>
  );
};

export default ProduitDetail;
