import axios from "axios";
import React, {useEffect, useState, useCallback} from "react";
import Navigation from "../components/Navigation";
import Logo from "./Logo";
import Ingredient from "../components/Ingredient";
import Commentaire from "../components/Commentaire";
import {Rating} from "react-simple-star-rating";
import {TestConsoleLogUsers} from '../contexts/TestUserContext'
import {toast} from 'react-toastify'

const RecetteDetail = ({match}) => {
    const user = TestConsoleLogUsers();
    const [body, setBody] = useState();
    const [recette, setRecette] = useState([]);
    const [commentaires, setCommentaires] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        axios.get(
            `http://localhost:8000/api/recettes/${match.params.id}`
        )
            .then(r => {
                console.log(3, r.data)
                setRecette(r.data)
                setCommentaires(r.data.commentaires)
                console.log(4, recette)
                console.log(5, commentaires)
            })

    }, []);

    const handleRating = (rate) => {
        setRating(rate);        
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBody({
            ...body, [name]: value
        })
    }

    

    console.log(6, body)
    console.log(7, user)
    
    const handleSubmit = (event) => {

        event.preventDefault()

        const newComment = {
            contenu: body.contenu,
            recette: `api/recettes/${recette.id}`,
            author: `/api/users/${user.id}`,
            rating: rating

        }

      


        axios.post('http://localhost:8000/api/commentaires', newComment, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }})
            .then(r => console.log(r))
            setCommentaires([
                ...commentaires, {...newComment, createdAt:Date.now(),author:{fullName:user.fullName, picture:user.picture}}
            ])
        toast.success("Commentaire posté ;)")
    }




    const commz = (commentaires).map((c, index) => (        
        <Commentaire
        key={index}
            // canEdit={c.author.id === user.id}            
            nom={c.author.fullName}
            contenu={c.contenu}
            rating={c.rating}
            avatar={c.author.picture}
            date={c.createdAt}            
            id={c.id}
           
        />
    ));

    return (
        <>
            <Navigation/>
            <Logo/>

            <div className="recette-container">
                <div className="recette-titre">
                    <h1>{recette.titre}</h1>
                    <div className="recette-etapes_description">{recette.description}</div>
                    <img src={"/img/" + recette.imgRecette} alt="imagerecette"/>

                    <div className="recette-author">
            <span>
              <strong>Auteur : </strong>
                {recette.author && recette.author.fullName}
            </span>
                        <br/>
                        <span>
              <strong>Type : </strong>
                            {recette.types}
            </span>
                    </div>
                </div>
            </div>
            <div className="recette-etapes">
                <div className="recette-info">
                    <div className="recette-prep">
                        <span><h3>Préparation</h3></span>
                        <span>{recette.preptime}</span>
                    </div>
                    <div className="recette-cook">
                        <span><h3>Temps de cuisson</h3></span>
                        <span>{recette.cooktime}</span>
                    </div>
                    <div className="recette-portion">
                        <span><h3>Portion</h3></span>
                        <span>{recette.portion} personnes</span>
                    </div>
                </div>
                <div className="recette-etapes_left">
                    <h2>Les étapes de la recette</h2>
                    {recette.etapes}
                </div>
            </div>


            <div className="recette-etapes_right">
                <h2>Ingredients</h2>
                <div className="recette-ingredients_list">

                <span>
               {recette.ingredients && recette.ingredients.map((i, index) => (
                   <Ingredient
                       key={index}
                       nom={i.nom}
                       image={i.image}
                   />
               ))}
                </span>

                </div>
            </div>
            <div className="progress-bar"></div>
            <div className="commentaires-container_left">
                <p className="commentaires-title">
                    { //check si y'a user
                        user.firstName
                            ? <h2>{user.firstName}, laissez votre avis !</h2>
                            : <h2>Enregistrez vous pour laissez votre avis !</h2>
                    }
                </p>
                <label>Notez la recette</label>
                <Rating
                    onClick={handleRating}
                    ratingValue={rating} /* Rating Props */
                />
                <label>Votre commentaire</label>

                <form onSubmit={handleSubmit}>
            <textarea
                id="comment"
                name="contenu"
                placeholder="Laissez votre commentaire"
                onChange={handleChange}
            />
                    <p className="form-submit">
                        <button type="submit" className="btnSubmit">
                            Poster
                        </button>
                    </p>
                </form>
            </div>
            <div className="commentaires-container_right">
                <p className="commentaires-title_right">
                    <h2>Avis des utilisateurs</h2>
                </p>

                {commz}
                

                {commentaires.length > 2 && (
                    <button type="submit" className="btnAvis">
                        Voir tous les avis
                    </button>
                )}
            </div>
        </>

    )
}

export default RecetteDetail;
