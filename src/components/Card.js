import React from 'react';

const Card = (props) => {
    const { produit } = props; //  raccourci de : const produit = props.produit, permet de skip le premier {produit: {...}}
    
    

    return (
        <li className="card">
            <img src={'img/' + produit.image} alt="imageproduit" />
            <div className="data-container">
                <ul>
                    <li>{produit.nom}</li>                    
                    <li>{produit.categorie}</li>
                </ul>
            </div>
        </li>
    );
    
};

export default Card;