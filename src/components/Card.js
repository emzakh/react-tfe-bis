import React from 'react';
import {Link} from 'react-router-dom';

const Card = (props) => {
    const { produit } = props; //  raccourci de : const produit = props.produit, permet de skip le premier {produit: {...}}
    

    return (
        <li className="card">
          
            <img src={'img/' + produit.image} alt="imageproduit" />
            <Link to={`/produits/${produit.id}`}>  
            <div className="data-container">
                <ul >
                 <li>{produit.categorie}</li>  
                </ul>
            </div>
               <div className="productNameCard">{produit.nom}</div>                    
            </Link> 
          
           
        </li>
    );
    
};

export default Card;