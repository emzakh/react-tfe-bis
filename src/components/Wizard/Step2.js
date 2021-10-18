import React, { useEffect, useState } from "react";
import { MainContainer } from "./MainContainer";
import Typography from "@material-ui/core/Typography";
import { Form } from "./Form";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useData } from "./DataContext";
import { Button } from "@material-ui/core";
import { PrimaryButton } from "./PrimaryButton";
import { yupResolver } from "@hookform/resolvers";
import { HeaderWizard } from "./HeaderWizard";
import * as yup from "yup";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/core/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { InputTextArea } from "./InputTextArea";
import { InputNumber } from "./InputNumber";
import Axios from "axios";

const schema = yup.object().shape({
  etapes: yup.string().required("Entrez les étapes de la recette"),
  preptime: yup.string().required("Entrez le temps de préparation"),
  cooktime: yup.string().required("Entrez le temps de cuisson"),
  portion: yup.string().required("Entrez le nombre de portions"),
  ingredients: yup.string().required("Entrez un ingredient")
});

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
    width: 300px;
    border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
      color: ${
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.65)"
          : "rgba(0,0,0,.85)"
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: ${
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
    };
    border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"
      };
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li[data-focus='true'] {
      background-color: ${
        theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"
      };
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `
);

export const Step2 = () => {
  // let produitFixed = produit.map((prod)=>([
  //   "nom" : prod.nom,
  //   "id" : prod.id
  // ]
  // ))

  //ce qu'il me faut : $pizza  = "piece1 piece2 piece3 piece4 piece5 piece6";

  //faire une boucle sur ça
  // const produitFixed = {
  //     id : produit.id
  // }

  // console.log(produitFixed)

  // useEffect(() => {
  // Axios
  //   .get("http://hildegarde.massimino.be/api/produits")
  //   .then((res) => res.data["hydra:member"])
  //   .then((produit) => setProduit(produit));
  // }, []);

  // console.log(100, produit)
  // console.log(103, produit[1])

  const [produit, setProduit] = useState([
    { nom: "Citron", id: 36 }
  ]);

  const [sel, setSel] = useState([]);

  

  const fetchProduits = async () => {
    try {
      Axios.get("http://hildegarde.massimino.be/api/produits")
        .then((res) => res.data["hydra:member"])
        .then((produit) => setProduit(produit))
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleInputChange = (event, newValue) => {
    setSel(newValue);
  }
  
  useEffect(() => {
    fetchProduits();  
  }, []);

  //sans [produit] qd l'app se lance ça fait juste fetchProduits()
  //qd [produit] change, le useeffect le check et recharge 


  // let produitFixed = produit.map((prod) => {
  //   return {
  //     nom: prod.nom,
  //     id: prod.id,
  //   };
  // });

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "ingredients",
    defaultValue: sel,
    multiple: true,
    options: produit,
    onChange: handleInputChange,
    getOptionLabel: (option) => option.nom,
  });

  const { setValues, data } = useData();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      etapes: data.etapes,
      preptime: data.preptime,
      cooktime: data.cooktime,
      portion: data.portion,
      ingredients: data.ingredients,
    },
    mode: "onBlur",
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let modifiedData = Object.assign({}, data); // copie non liée d'un objet 'deep clone'
    modifiedData.ingredients = sel // assignation de la nouvelle valeur 'ingredients'
    history.push("./step3");
    setValues(modifiedData);
  };

  // Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, tempora, deleniti quis ex voluptates possimus nesciunt nisi ipsum facere amet distinctio molestiae ab deserunt voluptatem inventore recusandae temporibus optio magnam?

  return (
    <>
      {/* <Navigation/> */}
      <MainContainer>
        <Typography component="h2" variant="h5">
        Etape 1
        </Typography>
        <HeaderWizard />
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
          <InputNumber
            ref={register}
            id="preptime"
            type="text"
            label="Temps de préparation"
            name="preptime"
            error={!!errors.etapes}
            helperText={errors?.etapes?.message}
            required
          />
          <InputNumber
            ref={register}
            id="cooktime"
            type="text"
            label="Temps de cuisson"
            name="cooktime"
            error={!!errors.etapes}
            helperText={errors?.etapes?.message}
            required
          />
          <InputNumber
            ref={register}
            id="portion"
            type="text"
            label="Portion"
            name="portion"
            error={!!errors.etapes}
            helperText={errors?.etapes?.message}
            required
          />

          <div {...getRootProps()}>
            <Label {...getInputLabelProps()}>Ingredients</Label>
            <InputWrapper
              ref={setAnchorEl}
              className={focused ? "focused" : ""}
              id="ingredients"
            >
              {value.map((option, index) => (
                <StyledTag label={option && option.nom} {...getTagProps({ index })} />
              ))}
              <input {...getInputProps()} />
            </InputWrapper>
          </div>
          {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>
                  <span>{option.nom}</span>
                  <CheckIcon fontSize="small" />
                </li>
              ))}
            </Listbox>
          ) : null}

          <PrimaryButton>Next</PrimaryButton>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={history.goBack}
          >
            Previous
          </Button>
        </Form>
      </MainContainer>
    </>
  );
};
