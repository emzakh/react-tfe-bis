import React, { useState } from "react";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
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
import Navigation from "../Navigation";

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
  console.log(user)
  console.log(user.id)
  console.log(`/api/users/${user.id}`)
  const styles = useStyles();
  const { data } = useData();
  const history = useHistory();
  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
  const { files } = data;

  const onSubmit = async () => {
    let formData = new FormData();
    
    
    // const auteur = {
    //     "id" : user.id, 
    //     "firstName" : user.firstName,
    //     "lastName" : user.lastName,
    //     "fullName" : user.fullName
    // }
   

const authorplz = {
  author:`/api/users/${user.id}`
}
    formData.append("author",authorplz)    
    // formData.append("date", "2021");
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("imgRecette", file, file.name);
      });
    }

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    try {
      axios.post("http://localhost:8000/api/recettes/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          

        }
      });
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      toast.success("Votre recette a bien été envoyée !")
      history.replace("/")
    } catch ({ response }) {
      console.log(response);
      const { violations } = response.data;
      if (violations) {
        console.log(violations);
      }
      toast.error("Des erreurs dans votre formulaire...");
    }
  };

 

  return (
    <>
      <Navigation />

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
              {entries.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell component="th" scope="row">
                    {entry[0]}
                  </TableCell>
                  <TableCell align="right">{entry[1].toString()}</TableCell>
                </TableRow>
              ))}
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
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        <Link to="/step1">Start over</Link>
      </MainContainer>
    </>
  );
};
