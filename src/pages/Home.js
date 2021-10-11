import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Card from "../components/Card";
import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import SearchHomeBar from "../components/search/Search";
import Slider from "react-slick";
import { RatingView } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const user = TestConsoleLogUsers();
  console.log("UserHomepage", user);

  const [recette, setRecette] = useState([]);
  const [produits, setProduits] = useState([]);

  const [fusion, setFusion] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:8000/api/produits"),
        axios.get("http://localhost:8000/api/recettes"),
      ])
      .then(
        axios.spread((obj1, obj2) => {
          setFusion([
            ...obj1.data["hydra:member"],
            ...obj2.data["hydra:member"],
          ]);
        })
      );
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recettes")
      .then((res) => res.data["hydra:member"])
      .then((data) => setRecette(data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/produits")
      .then((res) => res.data["hydra:member"])
      .then((data) => setProduits(data));
  }, []);

  console.log(recette);

  // const isGood = data.map((recette)=>{
  //   if (recette.avgRatings > "3"){

  //   }
  // })

  const isGood = recette.filter((data) => data.avgRatings > "3");
  console.log(isGood);

  const deSaison = produits.filter((data) => data.saison === "Toute l'année");
  console.log("desaison", deSaison);

  return (
    <>
      <header className="hero hero--home">
        <div className="hero__center">
          <h1 className="hero__title h2">
            Tout ce qu'il faut savoir sur les fruits et légumes frais
          </h1>
          <SearchHomeBar placeholder="Recherche..." data={fusion} />
        </div>
      </header>
      <div className="HomeContainer">
        <div className="HomeCarousel">
          <h2>Les recettes les mieux notées</h2>
          <Slider {...settings}>
            {isGood.map((recette) => (
              <>
                <Link to={`/recettes/${recette.id}`}>{recette.titre}
                <img
                  src={"http://localhost:8000/uploads/" + recette.imgRecette}
                  alt="imagerecette"
                />
                </Link>
                <li>
                  <RatingView ratingValue={recette.avgRatings} />
                </li>
              </>
            ))}
          </Slider>
        </div>
      </div>
      <hr />
      <div className="ProduitGrid">
        <div className="ProduitGrid-title">
          <h3>C'est de saison !</h3>
        </div>
        <div className="actualGrid">
          {deSaison.map((produit) => (
            <div>
              <Flippy
                flipOnHover={true} // default false
                flipOnClick={false} // default false
                flipDirection="horizontal" // horizontal or vertical
                // style={{ width: "200px", height: "200px", display:"flex" }}
              >
                <FrontSide
                // style={{
                //   backgroundColor: "#41669d",
                // }}
                >
                  <img
                    src={"http://localhost:8000/uploads/" + produit.image}
                    alt="imagerecette"
                  />
                </FrontSide>
                <BackSide>
                  
                  <div className="backside">{produit.nom}
                  
                  <button className="custom-btn btn-6">
                  <Link to={`/produits/${produit.id}`}>
                    <span>Read More</span>
                    </Link>
                    </button>
                  
                  </div>
                </BackSide>
              </Flippy>
            </div>
          ))}
        </div>
      </div>
   
       <div className="buttonProduit">
      <Button variant="outlined">
      <Link to={`/produits`}>Voir nos produits !</Link>
        </Button>
         
         </div>     


     
    </>
  );
};

export default Home;




// React :
// EditAvatar.js / EditProfile.js / EditPw.js

// Symfony : 
//   Entity : 
//     User.php
//   Controllers :
//     UpdateAvatar.php
//     UpdatePasswordController.php
//     UpdateUserController.php

// Faire une edition de profil sur le react
// Le symfony est en api, via api-platform

// Pour l'instant l'update retourne un 405 method not allowed sur l'edit de profil et d'avatar, et une error 500 internal server error sur l'update password (ligne 29 UpdatePasswordController retourne null ?)
