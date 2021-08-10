import React from 'react';
import {Link} from 'react-router-dom';

const Card = (props) => {
    const { produit } = props; //  raccourci de : const produit = props.produit, permet de skip le premier {produit: {...}}
    

    return (
        <li className="card">
          
            <img src={'img/' + produit.image} alt="imageproduit" />
            <div className="data-container">
                <ul>
                    <li><Link to={`/produits/${produit.id}`}>{produit.nom}</Link></li>                    
                    <li>{produit.categorie}</li>
                    
                 
                </ul>
            </div>
          
           
        </li>
    );
    
};

export default Card;