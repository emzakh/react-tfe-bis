import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import SearchHomeBar from "../components/search/Search";
import Slider from "react-slick";

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
          dots: false
        }
      },
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          
        }
      }
    ]
  };

  const user = TestConsoleLogUsers();
  console.log("UserHomepage", user);

  const [data, setData] = useState([]);
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
      .then((data) => setData(data));
  }, []);

  console.log(data);

  // const isGood = data.map((recette)=>{
  //   if (recette.avgRatings > "3"){

  //   }
  // })

  const isGood = data.filter((data) => data.avgRatings > "3");
  console.log(isGood);

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
      <div className="page-body page-body--white">
        <div className="HomeContainer">
          <div className="HomeCarousel">
            <h2>Les recettes les mieux notées</h2>
            <Slider {...settings}>
              {isGood.map((recette) => (
                <>
                  <div>
                  {recette.titre}
                    <img
                      src={
                        "http://localhost:8000/uploads/" + recette.imgRecette
                      }
                      alt="imagerecette"
                    />
                    
                  </div>
                 
                </>
              ))}
            </Slider>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Home;
