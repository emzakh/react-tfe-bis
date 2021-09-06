import axios from "axios";
import React, {useState, useEffect} from "react";
import Navigation from '../components/Navigation';
import Logo from "./Logo";
import Ingredient from "../components/Ingredient";
import Commentaire from "../components/Commentaire";
import { Link } from "react-router-dom";


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
        <Ingredient key={ig} nom={item.ingredients[ig].nom}/> 
    ))

    const commentaires = Object.keys(item.commentaires).map((com)=>( 
        <Commentaire key={com} nom={item.commentaires[com].author.fullName} contenu={item.commentaires[com].contenu} rating={item.commentaires[com].rating}/>
    ))

   


  return (
        <>
            <Navigation/>     
            <Logo/>      
            <div className="recette-container" key={item.titre}>   
                <div className="recette-titre">
                    <h1>{item.titre}</h1>
                    <div className="recette-etapes_description">
                {item.description}
                </div>
                    <img src={'/img/' + item.imgRecette} alt="imagerecette" />

                    <div className="recette-author">
                        <span><strong>Auteur : </strong>{item.author.fullName}</span> <br />     
                        <span><strong>Type : </strong>{item.types}</span>     

                    </div>                    
            </div>

            <div className="recette-etapes">
               
                <div className="recette-etapes_left">
                    <h2>Les étapes de la recette</h2>
                    {item.etapes}
                </div>

                <div className="recette-etapes_right">
                    <h2>Ingredients</h2> 
                    <div className="recette-ingredients_list">
                    <span>{ingredients}</span>
                    </div>
                </div>
            </div>
            
            {/* test comment */}
            {console.log(item.commentaires)}
            {commentaires}
    {/* fin test comment */}

                      
                   
                                             
                
           
            </div>    
        </>
    )
};

export default RecetteDetail;