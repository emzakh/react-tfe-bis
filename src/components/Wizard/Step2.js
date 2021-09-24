import React from 'react';
import {MainContainer} from "./MainContainer";
import Typography from "@material-ui/core/Typography";
import {Form} from "./Form";
import {Input} from "./Input";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router";
import {useData} from "./DataContext";
import {Button, Checkbox, FormControlLabel} from "@material-ui/core";
import {PrimaryButton} from "./PrimaryButton";
import { yupResolver } from "@hookform/resolvers";
import Navigation from "../Navigation";
import {HeaderWizard} from "./HeaderWizard";
import * as yup from "yup";

import { InputTextArea } from './InputTextArea';

const schema = yup.object().shape({
    etapes: yup
        .string()
        .required("Entrez les étapes de la recette"), 
})


export const Step2 = () => {
    const { setValues, data } = useData();
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm({
        defaultValues: {etapes:data.etapes},
        mode:"onBlur",
        resolver: yupResolver(schema)
    });   

    const onSubmit = (data) => {
        history.push("./step3");
        setValues(data);
    };

  

    return (
        <>
    <Navigation/>
        <MainContainer>
            <Typography component="h2" variant="h5">
                Step 2
            </Typography>
            <HeaderWizard/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputTextArea
                    ref={register}
                    id="etapes"
                    type="text"
                    label="1. Première étape..."
                    name="etapes"
                    error={!!errors.etapes}
                    helperText={errors?.etapes?.message}
                    required
                />
            
                <PrimaryButton>Next</PrimaryButton>
                <Button fullWidth
            variant="contained"
            color="primary"onClick={history.goBack}>Previous</Button>
            </Form>
        </MainContainer>
        </>
    );
};