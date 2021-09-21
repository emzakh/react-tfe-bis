
import React, {useState} from "react";
import { Rating, RatingView } from 'react-simple-star-rating'
import { IMG_USER } from '../config.js'
import axios from 'axios'
import {toast} from 'react-toastify'


const Commentaire = (props) => {

const [rating, setRating] = useState(0) // initial rating value

const handleRating = (rating) => {
    setRating(props.rating)
    console.log(rating)    
    
}


const deleteComment = (id) => {
    axios.delete(`http://localhost:8000/api/commentaires/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }})
            .then(r =>{                
                console.log(r)
                props.splice(id, 1)
            })
            toast.success("Commentaire supprimé")       
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
                        <button onClick={()=>{
                            deleteComment(props.id)
                            // console.log(props.id)

                        }}>Delete</button>         
                    </div>    
                  
            </div>

        </>
     );
}
 
export default Commentaire;