import Axios from "axios"
import jwtDecode from 'jwt-decode'
import {LOGIN_API} from '../config'


function authenticate(credentials){
    return Axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token)
            Axios.defaults.headers["Authorization"] = "Bearer " + token
            return
        })

}

function logout(){
    window.localStorage.removeItem("authToken")
    delete Axios.defaults.headers['Authorization']
}

function setup(){
    // voir si on a un token 
    const token = window.localStorage.getItem('authToken') /* si pas de token, il va renvoyer false ou null (donnée falsy, l'inverse c'est truthy) */

    if(token)
    {
        // si le token existe et s'il est encore valide 
        const jwtData = jwtDecode(token)
        // jwtDecode décole le token et on a par exemple accès à la variable d'expiration
        
        // millisecondes vs secondes 
        if((jwtData.exp * 1000) > new Date().getTime())
        {
            Axios.defaults.headers["Authorization"]="Bearer " + token 
        }
    }

}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken")
    console.log(token)
    if(token){
        const jwtData = jwtDecode(token)
        if((jwtData.exp * 1000) > new Date().getTime()){
            return true
        }
        return false // token expiré
    }
    return false // pas de token 
}



export default {
    authenticate: authenticate,
    logout: logout,
    setup: setup,
    isAuthenticated: isAuthenticated
}