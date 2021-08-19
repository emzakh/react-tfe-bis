import React from 'react';
import {Link} from 'react-router-dom';

const CardRecette = (props) => {
    const { recette } = props; //  raccourci de : const recette = props.recette, permet de skip le premier {recette: {...}}
    
    

    return (
        <li className="cardRecette">   
            <img src={'img/' + recette.imgRecette} className="card-img-recette" alt="imageproduit" />
            <Link to={`/recettes/${recette.id}`}>  
            <div className="data-container">
                <ul >
                 <li>{recette.types}</li>  
                </ul>
            </div>
               <div className="productNameCard">{recette.titre}</div>                    
            </Link> 
        </li>
    );
    
};

export default CardRecette;