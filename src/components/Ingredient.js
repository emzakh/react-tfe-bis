import React from 'react';

const Ingredient = (props) => {
    return ( 
        <>
          
            <li>{props.nom} <img src={"/img/" + props.image} alt="imageproduit" style={{objectFit: "cover", height:"40px", width:"40px", borderRadius:"50%", verticalAlign:"bottom"}}/> </li>  
            {}
          

        </>
     );
}
 
export default Ingredient;