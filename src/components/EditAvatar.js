import React, { useState } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import { Input, Stack } from "@mui/material";


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

export default function EditAvatar(props) {
  const classes = useStyles();
  const history = useHistory()

  // const users = TestConsoleLogUsers();
  const user = useLoginContext();
  console.log('user', user)

  const [profile, setProfile] = useState({
    picture: user.picture, 
  });

  const [fileName, setFileName] = useState();

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setProfile({ ...profile, picture: event.target.files[0] });
    setFileName(event.target.files[0].name);
  };

  // gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    
    formData.append("id", user.id);
    formData.append("picture", profile.picture);


    try {
      await Axios.post(`http://localhost:8000/api/users/updateavatar/${user.id}`, formData, {
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("authToken"),
            "Content-Type": "multipart/form-data",
        },
      });
      for (var pair of formData.entries()) {
        console.log("formData", pair[0] + ", " + pair[1]);
      }  
      
      toast.success("Profil modifié");
      console.log('test reussi')
     

      history.push(`/edit/${user.id}`);
    } catch ({ response }) {
      console.log(response);
      const { violations } = response.data;
      if (violations) {
        // violations.forEach(({ propertyPath, message }) => {
        //   apiErrors[propertyPath] = message;
        // });
        // setErrors(apiErrors);
        console.log(violations)
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
          Modifier votre avatar
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          noValidate
        >
          <Grid container spacing={2}>
          

           
   

            <Grid item xs={12} sm={6}>
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
              <Link to={`/editpw/${user.id}`}>                
                 Modifier votre mot de passe ?
                </Link>
              </Grid>
            </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}





