import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { TestConsoleLogUsers } from "../contexts/TestUserContext";

const LoginPage = (props) => {
 const user = TestConsoleLogUsers();
 console.log('userLogin:', user)

  const theme = createTheme();
  
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    // ... copie de l'objet credentials et la virgule permet de dire avec modification (ajout ou remplacement)
    // si on laisse simplement le name, il va venir écrire une entré name donc on va utiliser les crochet pour prendre en considération la valeur de la const name (ex: username)
    setCredentials({ ...credentials, [name]: value });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    console.log('isauth', isAuthenticated)
      await authAPI.authenticate(credentials);
      setIsAuthenticated(true);

      toast.success("Vous êtes connecté");
      props.history.replace("/");
    } catch (error) {
        toast.error("Aucun compte ne possède cette adresse e-mail ou les informations ne correspond pas")
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Pas encore de compte ?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginPage;
