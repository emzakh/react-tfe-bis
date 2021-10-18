import React, { useState, useEffect } from "react";
// import { TestConsoleLogUsers } from "../contexts/TestUserContext";
import { useLoginContext } from "../contexts/LoginContext";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

export default function EditProfile(props) {
  const classes = useStyles();
  const history = useHistory()
  // const users = TestConsoleLogUsers();
  const user = useLoginContext();
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    picture: user.picture,
    presentation: user.presentation,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    presentation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setProfile({ ...profile, [name]: value });
  };
  const [fileName, setFileName] = useState();

  const fileSelectedHandler = (event) => {
    setProfile({ ...profile, picture: event.target.files[0] });
    setFileName(event.target.files[0].name);
  };

  // gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const apiErrors = {};
    // if (profile.password !== profile.passwordConfirm) {
    //   apiErrors.passwordConfirm =
    //     "Votre confirmation de mot de passe n'est pas conforme à l'original";
    //   setErrors(apiErrors);
    //   // on arrete si ce n'est pas bon
    //   return;
    // }

    let formData = new FormData();

    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append("email", profile.email);
    // formData.append("password", profile.password);
    // formData.append("passwordConfirm", profile.passwordConfirm);
    formData.append("picture", profile.picture);
    formData.append("presentation", profile.presentation);

    try {
      await Axios.put(
        `http://hildegarde.massimino.be/api/users/update/${user.id}`,
        profile,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      for (var pair of formData.entries()) {
        console.log("formData", pair[0] + ", " + pair[1]);
      }
      toast.success("Profil modifié");
      history.push("/");
    } catch ({ response }) {
      console.log(response);
      const { violations } = response.data;
      if (violations) {
        console.log(violations);
      }
      toast.error("Des erreurs dans votre formulaire...");
    }
  };
  console.log("user:", user);
  console.log("item:", profile);

  return (
    // <form className={classes.root} onSubmit={handleSubmit} encType="multipart/form-data">
    <Container component="main" maxWidth="xs">
    
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Modifier vos informations
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="Prénom"
                value={profile.firstName}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Nom de famille"
                value={profile.lastName}
                onChange={handleChange}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={profile.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="presentation"
                label="Présentez-vous!"
                name="presentation"
                autoComplete="presentation"
                value={profile.presentation}
                onChange={handleChange}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label
                  htmlFor="contained-button-file"
                  className="fileAvatarUpload"
                >
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={fileSelectedHandler}
                  />
                  <Button variant="contained" component="span">
                    Avatar
                  </Button>
                </label>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <p>{fileName}</p>
            </Grid> */}
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
              <Link to={`/editpw/${user.id}`}>
                Modifier votre mot de passe ?
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/editavatar/${user.id}`}>Modifier votre avatar ?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
