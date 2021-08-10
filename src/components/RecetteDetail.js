import axios from "axios";
import React, {useState, useEffect} from "react";
import Navigation from '../components/Navigation';
import Logo from "./Logo";
import Ingredient from "../components/Ingredient";
import Commentaire from "../components/Commentaire";

const RecetteDetail = ({match}) => {
    // const [item, setItem] = useState({nom:'',nomlatin:'',effets:'',description:'',categorie:'', image:'', recettesAssociees:[] }); 
   const [item, setItem] = useState({id:'', titre:'', date:'', description:'', etapes:'', commentaires:{}, types:'', author:{}, ingredients:{}, imgRecette:''});
    useEffect(()=>{
        const fetchItem = async () => {
            const fetchItem = await axios.get(
                `http://localhost:8000/api/recettes/${match.params.id}`
            );
            const dataItem = await fetchItem.data;
            setItem(dataItem)
            console.log(dataItem)
        }  
        fetchItem();        
    },[match.params.id]);
//object.key cree un tableau avec des clés
//transforme un objet en tableau 

    const ingredients = Object.keys(item.ingredients).map((ig)=>(        
        // <div key={ig}>
        //     {item.ingredients[ig].nom}
        // </div>      
        <Ingredient key={ig} nom={item.ingredients[ig].nom}/> 
    ))

    const commentaires = Object.keys(item.commentaires).map((com)=>( 
        <Commentaire key={com} nom={item.commentaires[com].author.fullName} contenu={item.commentaires[com].contenu}/>
    ))



  return (
        <>
            <Navigation/>     
            <Logo/>      
            <div key={item.titre}>   
            <h1>TITRE:{item.titre}</h1>
            <h1>DATE:{item.date}</h1>
            <h1>DESCRIPTION:{item.description}</h1>
            <h1>ETAPES:{item.etapes}</h1>                    
            {/* <h1>COMMENTAIRES:{item.commentaires}</h1>            */}
            {commentaires}
            {/* {
            item.commentaires.map(comment=>(
                <div key={item.id}>
                    {comment.contenu}
                </div>
            ))
            } */}


            <h1>TYPE:{item.types}</h1>           
            <h1>AUTEUR:{item.author.fullName}</h1>           
            {/* {console.log(item.ingredients)} */}
       
            {/* <img src={'/img/' + item.imgRecette} alt="imagerecette" /> */}
            <h1>Ingredients : {ingredients}
            {/* {                
               item.ingredients.map(produit => (
                   <div key={item.id}>
                    {produit.nom}                
                   </div>                   
               )) 
            } */}
            </h1> 
            </div>    
        </>
    )
};

export default RecetteDetail;