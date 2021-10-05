import React, { useState, useEffect } from "react";
import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
import LinesEllipsis from "react-lines-ellipsis";

const UserProfilePage = ({ history, match }) => {
  dateFormat.i18n = {
    dayNames: [
      "Dim",
      "Lun",
      "Mar",
      "Merc",
      "Jeu",
      "Ven",
      "Sam",
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    monthNames: [
      "Jan",
      "Fev",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Au",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
  };

  const user = TestConsoleLogUsers();
  const [item, setItem] = useState({
    id:"",
    email: "",
    commentaires: [],
    recettes: [],
    firstName: "",
    lastName: "",
    picture: "",
    presentation: "",
    fullName: "",
  });
  console.log(user);

  useEffect(() => {
    const fetchItem = async () => {
      const fetchItem = await axios.get(
        `http://localhost:8000/api/users/${match.params.id}`
      );
      const dataItem = await fetchItem.data;
      setItem(dataItem);
      console.log(dataItem);
    };
    fetchItem();
  }, [match.params.id]);

  console.log(12, item);

  return (
    <>
      <header>
        <div className="container-profile">
          <div className="profile">
            <div className="profile-image">
              <img
                src={"http://localhost:8000/uploads/" + item.picture}
                alt="imgavatar"
              />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">{item.fullName}</h1>

            
              {
                //check si y'a user
                user.id === item.id ? (
                  <Link to="/edit" className="btn profile-edit-btn">

                Edit Profile
                </Link>
                ) : (
                  <div>
                    
                  </div>
                )
              }
               
               
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">
                    {item.recettes.length}
                  </span>{" "}
                  recettes
                </li>
                <li>
                  <span className="profile-stat-count">
                    {item.commentaires.length}
                  </span>{" "}
                  commentaires
                </li>
              </ul>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">{item.presentation}</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container-profile">
          <div className="gallery">
            {item.recettes.length < 1 && (
              <div className="no-recette">
                <strong>{item.firstName}</strong> n'a pas encore de recette
              </div>
            )}

            {item.recettes.length > 0 && (
              <div className="user-recette-container">
                <h1>Les recettes de {item.firstName}</h1>
                <div className="profile-recettes">
                  {item.recettes.map((recette) => (
                    <div key={recette.id}>
                      {console.log(recette.types)}
                      <li className="card-produit-recette">
                        <img
                          src={
                            "http://localhost:8000/uploads/" +
                            recette.imgRecette
                          }
                          className="card-img-recette"
                          alt="imagerecette"
                        />
                        <Link to={`/recettes/${recette.id}`}>
                          <div className="data-container">
                            <ul>
                              <li>{recette.types}</li>
                            </ul>
                          </div>
                          <div className="productNameCard">{recette.titre}</div>
                        </Link>
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.recettes.length < 1 && (
              <div className="no-recette">
                <strong>{item.firstName}</strong> n'a pas encore de recette
              </div>
            )}

            {item.commentaires.length > 0 && (
              <div className="user-recette-container">
                <h1>Les commentaires de {item.firstName}</h1>
                <div className="profile-commentaires">
                  {item.commentaires.map((commentaire) => (
                    <div key={commentaire.id}>
                      <div className="commentaire_contenu">
                        <div>
                       

                        <div className="commentaire_contenu_titre">
                        Le  <span>{dateFormat(commentaire.createdAt, "dd/mm/yyyy ")}</span>
                         
                        @
                            <span> 
                            <Link to={`/recettes/${commentaire.recette.id}`}>
                            {commentaire.recette.titre}
                            </Link>                          
                            </span>
                      
                          :
                        </div>

                        <div className="commentaire_contenu_content">
                        <LinesEllipsis
                            text={commentaire.contenu}
                            maxLine="2"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                          />

                        </div>
                      
                    
                      
                         
                        </div>
                      </div>

                      {/* <img
                          src={
                            "http://localhost:8000/uploads/" +
                            recette.imgRecette
                          }
                          className="card-img-recette"
                          alt="imagerecette"
                        /> */}
                      {/* <Link to={`/recettes/${recette.id}`}>
                          <div className="data-container">
                            <ul>
                              <li>{recette.types}</li>
                            </ul>
                          </div>
                          <div className="productNameCard">{recette.titre}</div>
                        </Link> */}
                      {/* </li> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default UserProfilePage;
