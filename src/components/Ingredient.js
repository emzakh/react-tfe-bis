import React from 'react';
import { Link } from 'react-router-dom';

const Ingredient = (props) => {
    return ( 
        <>
          
            <li><Link to={`/produits/${props.id}`}>{props.nom} </Link> <img src={"/img/" + props.image} alt="imageproduit" style={{objectFit: "cover", height:"40px", width:"40px", borderRadius:"50%", verticalAlign:"bottom"}}/> </li>  
            {}
          

        </>
     );
}
 
export default Ingredient;