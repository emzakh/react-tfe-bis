import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useData } from "./DataContext";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import { PrimaryButton } from "./PrimaryButton";
import { MainContainer } from "./MainContainer";
import axios from "axios";
import { toast } from "react-toastify";
import { TestConsoleLogUsers } from "../../contexts/TestUserContext";
import Axios from "axios"



const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
});

export const Result = () => {
  const user = TestConsoleLogUsers();
  console.log(user);
  console.log(user.id);
  console.log(`/api/users/${user.id}`);
  const styles = useStyles();
  const { data } = useData();
  const history = useHistory();
  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
  const { files } = data;

  const [produit, setProduit] = useState([
    { nom: "Citron", id: 36 }
  ]);

  const fetchProduits = async () => {
    try {
      Axios.get("http://localhost:8000/api/produits")
        .then((res) => res.data["hydra:member"])
        .then((produit) => setProduit(produit))
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchProduits();  
  }, []);

  console.log('produit', produit)



  console.log(420, entries)

  const onSubmit = async () => {
    let formData = new FormData();  

    try {
      if (data.files) {
        data.files.forEach((file) => {
          formData.append("imgRecette", file, file.name);
        });
      }
      entries.forEach((entry) => {
        console.log('entry', entry[0])
        if(entry[0]==="ingredients"){

          let simpleSel = entry[1].map(elem=>{
            return elem.id
          })
          entry[1] = simpleSel.join(',')

        }
        formData.append(entry[0], entry[1]);
      });
      for (var pair of formData.entries()) {
        console.log(421, pair[0] + ", " + pair[1]);
      }
      await axios
        .post("http://localhost:8000/api/recettes/new", formData, {
          headers: {           
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + window.localStorage.getItem("authToken"), 
            
          },
        })
        .then((response) => response.data);    
      toast.success("Votre recette a bien été envoyée !");
      history.replace("/");
    } catch ({ response }) {
      console.log(response);
      const { violations } = response.data;
      if (violations) {
        console.log(violations);
      }
      toast.error("Des erreurs dans votre formulaire...");
    }
  };

  const RenderCorrectEntries = props => {
    console.log('props: ', props.entries);
    props.entries.map((e) => {
      if (e[0] === 'ingredients') {
        console.log('IF');
        return (
          <TableRow key={e[0]}>
            <TableCell component="th" scope="row">
              {e[0]}
            </TableCell>
            {e[1].map((ingredient) => <TableCell align="justify" > {ingredient.nom }  </TableCell>)}
          </TableRow>
        )
      } else {
        console.log('ELSE');
        return (
          <TableRow key={e[0]}>
            <TableCell component="th" scope="row">
              {e[0]}
            </TableCell>
            <TableCell align="right">{e[1].toString()}</TableCell>
          </TableRow>
        )
      }
    })
    console.log('NO IF');
  }

  return (
    <>
      <MainContainer>
        <Typography component="h2" variant="h5">
          📋 Votre recette
        </Typography>
        <TableContainer className={styles.root} component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <RenderCorrectEntries entries={entries} /> */}

              {entries.map((entry) => {
                if (entry[0] === 'ingredients') {
                  return (
                    <TableRow key={entry[0]}>
                      <TableCell component="th" scope="row">
                        {entry[0]}
                      </TableCell>
                      {entry[1].map((ingredient) => <TableCell align="right">{ingredient.nom}</TableCell>)}
                    </TableRow>
                  )
                }
                console.log('entry:' , entry);


                return (
                  <TableRow key={entry[0]}>
                    <TableCell component="th" scope="row">
                      {entry[0]}
                    </TableCell>
                    <TableCell align="right">{entry[1].toString()}</TableCell>
                  </TableRow>  
                )
              })}



            </TableBody>
          </Table>
        </TableContainer>
        {files && (
          <>
            <Typography component="h2" variant="h5">
              📦 Image
            </Typography>
            <List>
              {files.map((f, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
        <PrimaryButton onClick={onSubmit}>Envoyer</PrimaryButton>
        <Link to="/step1">Revenir au début</Link>
      </MainContainer>
    </>
  );
};
