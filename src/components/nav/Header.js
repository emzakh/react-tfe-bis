import React, { useEffect, useState, useContext } from "react";
import SearchBarNav from "./SearchBarNav";
import axios from "axios";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import authAPI from "../../services/authAPI";
import AuthContext from "../../contexts/AuthContext";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TestConsoleLogUsers } from "../../contexts/TestUserContext";

const Header = () => {
  const user = TestConsoleLogUsers();
  console.log("nav", user);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes deconnecté");
    // props.history.push("/auth");
  };

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
          ]);
        })
      );
  }, []);

  console.log(1, isAuthenticated);

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
              <SearchBarNav placeholder="Recherche..." data={fusion} />
            </li>

            

            <li>
              <ul>
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link to="/register" onClick={menuToggleHandler}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth" onClick={menuToggleHandler}>
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      id="basic-button"
                      aria-controls="basic-menu"
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      {user.firstName}
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        {" "}
                        <Link to="/edit" onClick={menuToggleHandler}>
                          Modifier mon profil
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>Mon compte</MenuItem>

                      {
                        // check si role admin
                        user.roles.includes("ROLE_ADMIN") ? (
                          <MenuItem onClick={handleClose}>
                            <a
                              href="http://localhost:8000/admin"
                              onClick={menuToggleHandler}
                            >
                              Administration
                            </a>
                          </MenuItem>
                        ) : (
                          <h2>pas admin</h2>
                        )

                        // if(user.roles.indexOf("ROLE_ADMIN")!= -1){
                        //   <h2>admin!</h2>
                        // }
                      }
                      <MenuItem onClick={handleClose}>
                        <button
                          onClick={handleLogout}
                          className="btn btn-danger"
                        >
                          Déconnexion
                        </button>
                      </MenuItem>
                    </Menu>
                  </li>
                </>
              )}
              </ul>
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
