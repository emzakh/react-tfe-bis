import React, { useState } from "react";
import Layout from "./components/nav/Layout";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
// import {UserContext} from './contexts/TestUserContext'

import { GetAllUsers } from "./contexts/TestUserContext";
import { GetUser } from "./contexts/LoginContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Produits from "./pages/Produits";
import Recettes from "./pages/Recettes";
import authAPI from "./services/authAPI";
import Auth from "./pages/Auth";

import LoginPage from "./components/Login";

import Register from "./components/Register";
import RecetteDetail from "./components/RecetteDetail";
import ProduitDetail from "./components/ProduitDetail";
import UserProfile from "./components/UserProfile";
import Edit from "./pages/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Step1 } from "./components/Wizard/Step1";
import { Step2 } from "./components/Wizard/Step2";
import { Step3 } from "./components/Wizard/Step3";
import { Result } from "./components/Wizard/Result";
import { DataProvider } from "./components/Wizard/DataContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated
  );

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
  };

  console.log('isAuth App;: ', isAuthenticated);

  return (
        <BrowserRouter>
    <AuthContext.Provider value={contextValue}>
      <GetUser>
            <GetAllUsers>
          <Layout>
          <Switch>        
            <Route path="/" exact component={Home} />
            
            <Route path="/auth" component={LoginPage} />
            <Route path="/register" component={Register} />
              <Route path="/produits" exact component={Produits} />
              <Route path="/recettes" exact component={Recettes} />
              <Route path="/produits/:id" component={ProduitDetail} />
              <Route path="/recettes/:id" component={RecetteDetail} />
              <Route path="/edit" component={Edit} />
              <Route path="/profile" component={UserProfile} />
              <DataProvider>
                <Route path="/step1" component={Step1} />
                <Route path="/step2" component={Step2} />
                <Route path="/step3" component={Step3} />
                <Route path="/result" component={Result} />
              </DataProvider>
            <Route component={NotFound} />           
          </Switch>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </Layout>
            </GetAllUsers>
      </GetUser>
    </AuthContext.Provider>
        </BrowserRouter>
  );
};

export default App;
