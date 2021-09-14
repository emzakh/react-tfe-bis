
import React, {useState} from "react";
import { Rating, RatingView } from 'react-simple-star-rating'
import { IMG_USER } from '../config.js'



const Commentaire = (props) => {

const [rating, setRating] = useState(0) // initial rating value

const handleRating = (rating) => {
    setRating(props.rating)
    console.log(rating)    
    
}


const date = new Date(props.date)
    return ( 
        <>
            <div className="commentaires">
                
                    <div className="comment-user-avatar-container">
                        <img src={"http://localhost:8000/uploads/" + props.avatar} alt="imgavatar" />
                    </div>
                    <div className="comment-user-info-container">
                        <p>{props.nom} </p>
                        <span>{date.toLocaleString(undefined)}</span>
                        <RatingView ratingValue={props.rating} /* Rating Props */ />                        
                        <div className="contenu" dangerouslySetInnerHTML={{__html:props.contenu}}></div>                        
                    </div>    
                  
            </div>

        </>
     );
}
 
export default Commentaire;