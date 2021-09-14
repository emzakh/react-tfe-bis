import React, { useState } from 'react';
import Field from "./forms/Field"
import {Link} from "react-router-dom"
import Axios from "axios"
import { toast } from 'react-toastify'
import {USERS_IMG_API} from '../config'
// import http from "../http-common";


const RegisterPage = ({history}) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        picture: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        picture: ""
    })

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const {name, value} = event.currentTarget
        setUser({...user, [name]: value})
    }
    

    const fileSelectedHandler = event => {
        console.log(event.target.files[0])
       setUser({...user,picture:event.target.files[0]}) 
    }

  
    
    // gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault()

        const apiErrors = {}
        if(user.password !== user.passwordConfirm)
        {
            apiErrors.passwordConfirm="Votre confirmation de mot de passe n'est pas conforme à l'original"
            setErrors(apiErrors)
            // on arrete si ce n'est pas bon
            return 
        }  

        let formData = new FormData();

        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("passwordConfirm", user.passwordConfirm);
        formData.append("picture", user.picture);

        try{
            await Axios.post(USERS_IMG_API, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                }}
                )
            setErrors({})
            toast.success("Vous êtes inscrit, vous pouvez vous connecter")
            history.replace("/auth")
        }catch({response})
        {
            console.log(response)
            const {violations} = response.data
            if(violations){

                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Des erreurs dans votre formulaire...")
        }


    }

    return ( 
        <>
            <h1>Inscriptions</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Field 
                    name="firstName"
                    label="Prénom"
                    placeholder="Votre prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field 
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Votre nom de famille"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                 <Field 
                    name="email"
                    label="Adresse E-mail"
                    type="email"
                    placeholder="Votre adresse e-mail"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field 
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="Votre mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field 
                    name="passwordConfirm"
                    label="Confirmation de mot de passe"
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
            
            <div className="container" style={{ width: "600px" }}>   
                <input
                type="file"                               
                onChange={fileSelectedHandler}
                />
            </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                    <Link to="/login" className="btn btn-secondary">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
     );
}
 
export default RegisterPage;