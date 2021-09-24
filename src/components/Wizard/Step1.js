import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import Navigation from "../Navigation";
import { HeaderWizard } from "./HeaderWizard";
import { MainContainer } from "./MainContainer";
import { Form } from "./Form";
import { Input } from "./Input";

import Typography from "@material-ui/core/Typography";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useData } from "./DataContext";
import { PrimaryButton } from "./PrimaryButton";
import { InputTextArea } from "./InputTextArea";
import { InputSelect } from "./InputSelect";

const schema = yup.object().shape({
  titre: yup
    .string()
    .matches(/^([^0-9]*)$/, "Le titre ne doit pas contenir de nombres")
    .required("Entrez un titre"),
  description: yup
    .string()
    // .matches(/^([^0-9]*)$/, "La description ne doit pas contenir de nombres")
    .required("Entrez une description"),
  types: yup.string(),
});

export const Step1 = () => {
  const { setValues, data } = useData();
  const { register, handleSubmit, errors } = useForm({
    //validation s active qd linput est unfocus (blur)
    defaultValues: {
      titre: data.titre,
      description: data.description,
      types: data.types,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const onSubmit = (data) => {
    history.push("/step2");
    setValues(data);
  };
  return (
    <>
      <Navigation />
      <MainContainer>
        <Typography component="h2" variant="h5">
          Step 1
        </Typography>
        <HeaderWizard />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            ref={register}
            name="titre"
            type="text"
            label="Titre de la recette"
            error={!!errors.titre}
            helperText={errors?.titre?.message}
          />
          <InputTextArea
            ref={register}
            name="description"
            type="text"
            label="Courte description de la recette"
            error={!!errors.description}
            helperText={errors?.description?.message}
          />
          <InputSelect
            ref={register}
            name="types"
            
            type="text"
            error={!!errors.etapes}
          />
          <PrimaryButton type="submit">Next</PrimaryButton>
        </Form>
      </MainContainer>
    </>
  );
};
