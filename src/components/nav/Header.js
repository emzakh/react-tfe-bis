import React, { useEffect, useState } from "react";
import SearchBarNav from './SearchBarNav';
import axios from "axios"
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
    const history = useHistory();
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

 

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
            ])             
          })
        );
    }, []);


    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
               
                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                        <Link to="/" className={classes.header__content__logo}>
                Home
                </Link>

                        </li>

                        <li>
                            <Link to="/a-propos" onClick={menuToggleHandler}>
                            A propos
                            </Link>
                        </li>
                        <li>
                            <Link to="/produits" onClick={menuToggleHandler}>
                            Produits
                            </Link>
                        </li>
                        <li>
                            <Link to="/recettes" onClick={menuToggleHandler}>
                            Recettes
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth" onClick={menuToggleHandler}>
                            Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/edit" onClick={menuToggleHandler}>
                            Edit Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" onClick={menuToggleHandler}>
                            Register
                            </Link>
                        </li>
                        <li>                          
                        <SearchBarNav placeholder="Recherche..." data={fusion} />
                        </li>

                    </ul>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;