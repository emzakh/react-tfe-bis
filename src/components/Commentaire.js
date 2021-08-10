import React from 'react';

const Commentaire = (props) => {
    return ( 
        <>
            <div className="commentaires">
                <div className="author">
                    {props.nom} 
                </div>
                <div className="contenu" dangerouslySetInnerHTML={{__html:props.contenu}}></div>

               
            </div>

        </>
     );
}
 
export default Commentaire;