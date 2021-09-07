
import React, {useState} from "react";
import { Rating, RatingView } from 'react-simple-star-rating'



const Commentaire = (props) => {

const [rating, setRating] = useState(0) // initial rating value
    
const handleRating = (rate) => {
    setRating(rate)
    // Some logic
}
    return ( 
        <>
            <div className="commentaires">
                
                    <div className="comment-user-avatar-container">
                        <img src={"/img/" + props.avatar} alt="imgavatar" />
                    </div>
                    <div className="comment-user-info-container">
                        <p>{props.nom} </p>
                        <span>{props.date}</span>
                        <RatingView ratingValue={props.rating} /* Rating Props */ />                        
                        <div className="contenu" dangerouslySetInnerHTML={{__html:props.contenu}}></div>                        
                    </div>    
                  
            </div>

        </>
     );
}
 
export default Commentaire;