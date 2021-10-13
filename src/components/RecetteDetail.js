import axios from "axios";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Ingredient from "../components/Ingredient";
import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Rating, RatingView } from "react-simple-star-rating";
import Pagination from "./Pagination";
import Grid from "@material-ui/core/Grid";

const RecetteDetail = ({ match }) => {
  const user = TestConsoleLogUsers();
  const [body, setBody] = useState();
  const [recette, setRecette] = useState([]);
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  // const [commentIndex, setCommentIndex] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [editedId, setEditedId] = useState(null);
  const [editedComment, setEditedComment] = useState(null);
  const [editedRating, setEditedRating] = useState(null);

 

  const updateComment = (event) => {
    setData((commentaires) =>
      commentaires.map((c) => {
        if (c.id === editedId) {
          c.contenu = editedComment;
          c.rating = editedRating;
        }
        return c;
      })
    );
    setEditedId(null);
    event.preventDefault();
    axios
      .put(
        "http://localhost:8000/api/commentaires/" + editedId,
        { contenu: editedComment, rating: editedRating },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((r) => {
        console.log(r);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recettes/${match.params.id}`)
      .then((r) => {
        // console.log(3, r.data)
        setRecette(r.data);
        setData(r.data.commentaires);
        setCurrentPage(1);
        // console.log(4, recette)
      });
  }, []);

  // PAGINATION

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedData = Pagination.getData(data, currentPage, itemsPerPage);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      contenu: body.contenu,
      recette: `api/recettes/${recette.id}`,
      author: `/api/users/${user.id}`,
      rating: rating,
    };

    axios
      .post("http://localhost:8000/api/commentaires", newComment, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((r) => {
        setData([
          ...data,
          {
            ...newComment,
            id: r.data.id,
            createdAt: Date.now(),
            author: {
              fullName: user.fullName,
              picture: user.picture,
              id: user.id,
            },
          },
        ]);
      });
    toast.success("Commentaire posté ;)");
  };

  const deleteComment = (id, index) => {
    // console.log(20, id, index)
    axios
      .delete(`http://localhost:8000/api/commentaires/` + id, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((r) => {
        // console.log(r)
        data.splice(index, 1);
        setData(data);
        setDeletedId(id);
      });
    toast.success("Commentaire supprimé");
  };

  console.log(1, currentPage, itemsPerPage);

  return (
    <>
      <div className="recette-container">
        <div className="recette-titre">
          <h1>{recette.titre}</h1>
          <div className="recette-etapes_description">
            {recette.description}
          </div>

          <img
            src={"http://localhost:8000/uploads/" + recette.imgRecette}
            alt="imagerecette"
          />

          <div className="recette-author">
            <span>
              <strong>Auteur : </strong>
              {recette.author && (
                <Link to={`/profile/${recette.author.id}`}>
                  {recette.author.fullName}
                </Link>
              )}
            </span>

            <span>
              <strong>Type : </strong>
              {recette.types}
            </span>
            <span>
              <RatingView ratingValue={recette.avgRatings} />
            </span>
          </div>
        </div>

        <div className="recette-etapes">
          
          <div className="recette-info">
            <div className="recette-prep">
              <span>
                <h3>Préparation</h3>
              </span>
              <span>{recette.preptime}</span>
            </div>
            <div className="recette-cook">
              <span>
                <h3>Temps de cuisson</h3>
              </span>
              <span>{recette.cooktime}</span>
            </div>
            <div className="recette-portion">
              <span>
                <h3>Portion</h3>
              </span>
              <span>{recette.portion} personnes</span>
            </div>
          </div>
       
          <div className="recette-etapes_left">
            <h2>Les étapes de la recette</h2>
            {recette.etapes}
          </div>

          <div className="recette-etapes_right">
            <h2>Ingredients</h2>
            <div className="recette-ingredients_list">
              <span>
                {recette.ingredients &&
                  recette.ingredients.map((i, index) => (
                    <Ingredient key={index} nom={i.nom} image={i.image} />
                  ))}
              </span>
            </div>
          </div>
          

          <div className="progress-bar"></div>
          <div className="commentaires-container_left">
            <p className="commentaires-title">
              {
                //check si y'a user
                user.firstName ? (
                  <>
                  <h2>{user.firstName}, laissez votre avis !</h2>
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
                  </>
                ) : (
                  <Grid container  direction="column" spacing={2}>
                  <Grid item>
                  <Link to="/auth">Vous avez déjà un compte ? Connectez-vous pour laisser un avis !</Link>            
                  </Grid>
                  <Grid item>
                <Link to="/register">
                  Pas encore de compte ? Créez en un !
                </Link>
              </Grid>
                </Grid>
                )
              }
            </p>
   
          </div>

          <div className="commentaires-container_right">
            <p className="commentaires-title_right">
              <h2>Avis des utilisateurs</h2>
            </p>

            {paginatedData.map((c, index) => (
              <div key={index}>
                <div className="commentaires">
                  <div className="comment-user-avatar-container">
                    {/* <img src={"http://localhost:8000/uploads/" + recette.imgRecette} alt="imagerecette" /> */}

                    <img
                      src={"http://localhost:8000/uploads/" + c.author.picture}
                      alt="imgavatar"
                    />
                  </div>
                  <div className="comment-user-info-container">
                    {c.author && (
                      <Link to={`/profile/${c.author.id}`}>
                        {c.author.fullName}
                      </Link>
                    )}

                    <span>
                      {new Date(c.createdAt).toLocaleString(undefined)}
                    </span>

                    {editedId !== c.id ? (
                      <div>
                        <RatingView ratingValue={c.rating} /* Rating Props */ />
                        <div className="contenu"> {c.contenu} </div>
                      </div>
                    ) : (
                      <form onSubmit={updateComment}>
                        <Rating
                          onClick={setEditedRating}
                          ratingValue={editedRating} /* Rating Props */
                        />
                        <textarea
                          id="comment"
                          name="contenu"
                          placeholder="Laissez votre commentaire"
                          onChange={(event) => {
                            console.log(22, event.target.value);
                            setEditedComment(event.target.value);
                          }}
                        >
                          {editedComment}
                        </textarea>
                        <p className="form-submit">
                          <button type="submit" className="btnSubmit">
                            Poster
                          </button>
                        </p>
                      </form>
                    )}
                    {user.id === c.author.id ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteComment(c.id, index);
                        }}
                      >
                        Delete
                      </button>
                    ) : null}

                    {user.id === c.author.id ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditedId(c.id);
                          setEditedComment(c.contenu);
                        }}
                      >
                        Edit
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
                    {itemsPerPage < data.length && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              length={data.length}
              onPageChanged={handlePageChange}
            />
          )}
          </div>
  
        </div>
      </div>
    </>
  );
};

export default RecetteDetail;
