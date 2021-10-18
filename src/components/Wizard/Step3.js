import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useData } from "./DataContext";
import Typography from "@material-ui/core/Typography";
import {MainContainer} from "./MainContainer";
import {Form} from "./Form";
import {PrimaryButton} from "./PrimaryButton";
import {FileInput} from "./FileInput";
import { Button } from "@material-ui/core";
import { HeaderWizard } from "./HeaderWizard";


export const Step3 = () => {
    const history = useHistory();
    const { data, setValues } = useData();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            files: data.files,
        },
    });

    const onSubmit = (data) => {
        history.push("./result");
        setValues(data);
    };


    return (
        <>
     {/* <Navigation/> */}
        <MainContainer>
            <Typography component="h2" variant="h5">
            Etape 3
            </Typography>
             <HeaderWizard/> 
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput name="files" control={control} />
                <PrimaryButton>Next</PrimaryButton>
                <Button fullWidth
            variant="contained"
            color="primary"onClick={history.goBack}>Previous</Button>
          

            </Form>
        </MainContainer>
        </>
    );
};