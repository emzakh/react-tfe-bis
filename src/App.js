import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
// import {UserContext} from './contexts/TestUserContext'

import {GetAllUsers} from './contexts/TestUserContext';
import {GetUser} from './contexts/LoginContext';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Produits from './pages/Produits';
import Recettes from './pages/Recettes';
import authAPI from './services/authAPI';

import Auth from './pages/Auth';
import Register from './components/Register';
import RecetteDetail from './components/RecetteDetail';
import ProduitDetail from './components/ProduitDetail';
import Edit from './pages/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated)

  const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }

  // const [user, setUser] = useState(null);
  
  // const value = useMemo(()=>({user,setUser}), [user,setUser])

  return (
    

      <AuthContext.Provider value={contextValue}>
      <GetUser>
    <BrowserRouter>
      <Switch>
        {/* <UserContext.Provider value={value}> */}
        <Route path="/" exact component={Home} /> 
        <Route path="/a-propos" component={About}/>
        <Route path="/auth" component={Auth} />
        <Route path="/register" component={Register} />
        <GetAllUsers>
        <Route path="/produits" exact component={Produits}/>
        <Route path="/recettes" exact component={Recettes}/>
        <Route path="/produits/:id" component={ProduitDetail} />
        <Route path="/recettes/:id" component={RecetteDetail} />
        <Route path="/edit" component={Edit} />
        </GetAllUsers>
        {/* </UserContext.Provider> */}
        <Route component={NotFound}/>  
        
      </Switch>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />

    </BrowserRouter>
    </GetUser>
        </AuthContext.Provider>

  );
};

export default App;