import React, { useState, useEffect } from "react";
import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import { Link } from "react-router-dom";
import axios from 'axios';

const UserProfilePage = ({ history, match }) => {
  const user = TestConsoleLogUsers();
  const [item, setItem] = useState({
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

  console.log(item)

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

              <button className="btn profile-edit-btn">Edit Profile</button>
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
          {/* {user.recettes.length> 0 &&         

          
          user.recettes.map((recette) => (
              <div key={recette.id}>
                <div className="gallery-item">
                  <img
                    src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                    className="gallery-image"
                    alt=""
                  />

                  <div className="gallery-item-info">
                    <ul>
                      <li className="gallery-item-likes">
                        <span className="visually-hidden">Likes:</span>
                        <i className="fas fa-heart" aria-hidden="true"></i> 56
                      </li>
                      <li className="gallery-item-comments">
                        <span className="visually-hidden">Comments:</span>
                        <i className="fas fa-comment" aria-hidden="true"></i> 2
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))} */}

{item.recettes.length > 0 &&
       <div className="user-recette-container">
       <h1>Les recettes de {item.firstName}</h1>
   <div className="produit-recettes">
     {item.recettes.map((recette) => (
       <div key={recette.id}>
           { console.log(recette.types)}
         <li className="card-produit-recette">
         <img src={"http://localhost:8000/uploads/" + recette.imgRecette} className="card-img-recette" alt="imagerecette"/>
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
      }
           {item.recettes.length < 1 &&
     <div className="no-recette">  
       <strong>{item.firstName}</strong> n'a pas encore de recette 
       </div>
      }
          </div>
        </div>
      </main>
    </>
  );
};
export default UserProfilePage;
