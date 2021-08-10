import axios from "axios";
import React, {useState, useEffect} from "react";
import Navigation from '../components/Navigation';
import Logo from "./Logo";

const ProduitDetail = ({match}) => {
    const [item, setItem] = useState({nom:'',nomlatin:'',effets:'',description:'',categorie:'', image:'', recettesAssociees:[] }); 
   // const [item, setItem] = useState([]);
    useEffect(()=>{
        const fetchItem = async () => {
            const fetchItem = await axios.get(
                `http://localhost:8000/api/produits/${match.params.id}`
            );
            const dataItem = await fetchItem.data;
            setItem(dataItem)
            console.log(dataItem)
        }  
        fetchItem();        
    },[match.params.id]);

  return (
        <>
            <Navigation/>     
            <Logo/>             
            <h1>{item.nom}</h1>
            <h1>{item.nomlatin}</h1>
            <h1>{item.effets}</h1>
            <h1>{item.description}</h1>
            <h1>{item.categorie}</h1>           
            {
               item.recettesAssociees.map(recette => (
                   <div key={recette.id}>
                   {recette.titre}
                   {recette.id}
                   </div>
                   
               )) 
            }
            <img src={'/img/' + item.image} alt="imageproduit" />
        </>
    )
};

export default ProduitDetail;