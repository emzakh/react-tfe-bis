import React, { useState, useEffect } from "react";
// import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import { useLoginContext } from "../contexts/LoginContext";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Input, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { USERS_IMG_API } from "../config";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Editpw(props) {
  const classes = useStyles();

  // const users = TestConsoleLogUsers();
  const user = useLoginContext();
  console.log("user", user);

  const [profile, setProfile] = useState({
    oldPassword: user.oldPassword,
    newPassword: user.newPassword,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setProfile({ ...profile, [name]: value });
  }; 

  
  const handleSubmit = async (event) => {
    event.preventDefault();

  

    try {
      await Axios.put(
        `http://localhost:8000/api/users/updatepw/${user.id}`,
        profile,
        {
          headers: {
            "Content-type": "application/json",      
            "Authorization": "Bearer " + window.localStorage.getItem("authToken"),
          },
        }
      );
      // setErrors({})

      // await Axios.post(`http://localhost:8000/api/users/${user.id}`)

      toast.success("Profil modifier");
    } catch ({ response }) {
      console.log(response);
      const { violations } = response.data;
      if (violations) {
        // violations.forEach(({ propertyPath, message }) => {
        //   apiErrors[propertyPath] = message;
        // });
        // setErrors(apiErrors);
        console.log("lol");
      }
      toast.error("Des erreurs dans votre formulaire...");
    }
  };
  console.log("user:", user);
  console.log("item:", profile);

  return (
    // <form className={classes.root} onSubmit={handleSubmit} encType="multipart/form-data">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modifier votre mot de passe
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          //??? ---------------------------------
          encType="application/json"
          //??? -------------------------------------
          noValidate
        >
          <Grid container spacing={2}>           

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="oldPassword"
                label="Ancien mdp"
                type="password"
                id="oldPassword"
                autoComplete="current-password"
                value={profile.oldPassword}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="newPassword"
                label="Nouveau mdp"
                type="password"
                id="newPassword"
                autoComplete="current-password"
                value={profile.newPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Modifier
          </Button>

          
          <Grid container>
              <Grid item xs>
              <Link to={`/edit/${user.id}`}>
                 Modifier vos informations ?
              </Link>
              </Grid>
              <Grid item>
              <Link to={`/editavatar/${user.id}`}> 
                 Modifier votre avatar ?
                </Link>
              </Grid>
            </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
