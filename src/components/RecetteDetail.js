import axios from "axios";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Logo from "./Logo";
import Ingredient from "../components/Ingredient";
import Commentaire from "../components/Commentaire";
import { Link } from "react-router-dom";
import { Rating, RatingView } from "react-simple-star-rating";

const RecetteDetail = ({ match }) => {
  // const [item, setItem] = useState({nom:'',nomlatin:'',effets:'',description:'',categorie:'', image:'', recettesAssociees:[] });
  const [item, setItem] = useState({
    id: "",
    titre: "",
    date: "",
    description: "",
    etapes: "",
    commentaires: {},
    types: "",
    author: {},
    ingredients: {},
    imgRecette: "",
    preptime: "",
    cooktime: "",
    portion: "",
  });

  const [rating, setRating] = useState(0); // initial rating value

  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };

  useEffect(() => {
    const fetchItem = async () => {
      const fetchItem = await axios.get(
        `http://localhost:8000/api/recettes/${match.params.id}`
      );
      const dataItem = await fetchItem.data;
      setItem(dataItem);
      console.log(dataItem);
    };
    fetchItem();
  }, [match.params.id]);
  //object.key cree un tableau avec des clés
  //transforme un objet en tableau

  const ingredients = Object.keys(item.ingredients).map((ig) => (
    <Ingredient
    key={ig}
    nom={item.ingredients[ig].nom}
    image={item.ingredients[ig].image} />
  ));

  const commentaires = Object.keys(item.commentaires).map((com) => (
    <Commentaire
      key={com}
      nom={item.commentaires[com].author.fullName}
      contenu={item.commentaires[com].contenu}
      rating={item.commentaires[com].rating}
      avatar={item.commentaires[com].author.picture}
      date={item.commentaires[com].createdAt}
      
    />
  ));

  return (
    <>
      <Navigation />
      <Logo />
      <div className="recette-container" key={item.titre}>
        <div className="recette-titre">
          <h1>{item.titre}</h1>
          <div className="recette-etapes_description">{item.description}</div>
          <img src={"/img/" + item.imgRecette} alt="imagerecette" />

          <div className="recette-author">
            <span>
              <strong>Auteur : </strong>
              {item.author.fullName}
            </span>{" "}
            <br />
            <span>
              <strong>Type : </strong>
              {item.types}
            </span>
          </div>
        </div>

        <div className="recette-etapes">
          <div className="recette-info">
            <div className="recette-prep">
              <span><h3>Préparation</h3></span>
              <span>{item.preptime}</span>
            </div>
            <div className="recette-cook">
                <span><h3>Temps de cuisson</h3></span>
                <span>{item.cooktime}</span>
            </div>
            <div className="recette-portion">
                <span><h3>Portion</h3></span>
                <span>{item.portion} personnes</span>
            </div>
          </div>
          <div className="recette-etapes_left">
            <h2>Les étapes de la recette</h2>
            {item.etapes}
          </div>

          <div className="recette-etapes_right">
            <h2>Ingredients</h2>
            <div className="recette-ingredients_list">
              <span>{ingredients}</span>
            </div>
          </div>

          <div className="progress-bar"></div>

          <div className="commentaires-container_left">
            <p className="commentaires-title">
              <h2>UserName, laissez votre avis !</h2>
            </p>
            <label>Notez la recette</label>
            <Rating
              onClick={handleRating}
              ratingValue={rating} /* Rating Props */
            />
            <label>Votre commentaire</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Laissez votre commentaire"
            ></textarea>

            <p className="form-submit">
              <button type="submit" className="btnSubmit">
                Poster
              </button>
            </p>
          </div>

          <div className="commentaires-container_right">
            <p className="commentaires-title_right">
              <h2>Avis des utilisateurs</h2>
            </p>
            {commentaires}

            {commentaires.length > 2 && (
              <button type="submit" className="btnAvis">
                Voir tous les avis
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecetteDetail;
