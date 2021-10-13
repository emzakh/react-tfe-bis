import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        margin: theme.spacing(3,0,2),
        textAlign:"center",
        fontSize:"40px",
      
    }
}))


export const HeaderWizard = () => {
    const styles = useStyles()
    return(
        <Typography className={styles.root} component="h1">
            Ajouter une recette
        </Typography>
    )
}