import React, { useState } from 'react';
import {Link} from "react-router-dom"
import Axios from "axios"
import { toast } from 'react-toastify'
import {USERS_IMG_API} from '../config'
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
import { Input, Stack } from '@mui/material';

// import http from "../http-common";


const useStyles = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));

  

const RegisterPage = ({history}) => {

    const classes = useStyles();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        presentation:"",
        picture: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        presentation:"",
        picture: ""
    })

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const {name, value} = event.currentTarget
        setUser({...user, [name]: value})
    }
    
    const[fileName, setFileName] =  useState()

    const fileSelectedHandler = event => {
        setUser({...user,picture:event.target.files[0]}) 
        setFileName(event.target.files[0].name)

    }

  
    
    // gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault()

        const apiErrors = {}
        if(user.password !== user.passwordConfirm)
        {
            apiErrors.passwordConfirm="Votre confirmation de mot de passe n'est pas conforme à l'original"
            setErrors(apiErrors)
            // on arrete si ce n'est pas bon
            return 
        }  

        let formData = new FormData();

        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("passwordConfirm", user.passwordConfirm);
        formData.append("picture", user.picture);
        formData.append("presentation",user.presentation);

        try{
            await Axios.post(USERS_IMG_API, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                }}
                )
                for (var pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]); 
                }
            setErrors({})
            toast.success("Vous êtes inscrit, vous pouvez vous connecter")
            history.replace("/auth")
        }catch({response})
        {
            console.log(response)
            const {violations} = response.data
            if(violations){

                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Des erreurs dans votre formulaire...")
        }


    }

    return ( 

                // <form className={classes.root} onSubmit={handleSubmit} encType="multipart/form-data">   
<Container component="main" maxWidth="xs">

<div className={classes.paper}>
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
    Créer un compte
  </Typography>
  <form className={classes.form}onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="fname"
          name="firstName"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="Prénom"
          value={user.firstName}
          onChange={handleChange}
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="lastName"
          label="Nom de famille"
          value={user.lastName}
          onChange={handleChange}
          name="lastName"
          autoComplete="lname"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={user.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="presentation"
          label="Présentez-vous!"
          name="presentation"
          autoComplete="presentation"
          value={user.presentation}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          id="password"
          autoComplete="current-password"
          value={user.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="passwordConfirm"
          label="Confirmez le mot de passe"
          type="password"
          id="passwordConfirm"
          autoComplete="current-password"
          value={user.passwordConfirm}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file" className="fileAvatarUpload">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={fileSelectedHandler}  />
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
      Sign Up
    </Button>
    <Grid container justify="flex-end">
      <Grid item>
      <Link to="/auth">Vous avez déjà un compte ? Connectez-vous</Link>
      </Grid>
    </Grid>
  </form>
</div>
<Box mt={5}>
</Box>
</Container>
);
}
export default RegisterPage;