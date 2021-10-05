import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import SearchHomeBar from "../components/search/Search";
import Slider from "react-slick";

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
  const user = TestConsoleLogUsers();
  console.log("UserHomepage", user);

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
        <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
        </div>
    </div>

    </>
  );
};

export default Home;
