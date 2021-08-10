import React from 'react';
import {Link} from 'react-router-dom';

const CardRecette = (props) => {
    const { recette } = props; //  raccourci de : const recette = props.recette, permet de skip le premier {recette: {...}}
    
    

    return (
        <li className="card">
            
            <img src={'img/' + recette.imgRecette} alt="imagerecette" />
            <div className="data-container">
                <ul>
                    <li><Link to={`/recettes/${recette.id}`}>{recette.titre}</Link></li>                    
                    <li>{recette.types}</li>                    
                 
                </ul>
            </div>
          
           
        </li>
    );
    
};

export default CardRecette;