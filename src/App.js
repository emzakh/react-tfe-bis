import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext'
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated)

  const contextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }

  return (
    <AuthContext.Provider value={contextValue}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} /> 
        <Route path="/a-propos" component={About}/>
        <Route path="/produits" exact component={Produits}/>
        <Route path="/recettes" exact component={Recettes}/>
        <Route path="/produits/:id" component={ProduitDetail} />
        <Route path="/recettes/:id" component={RecetteDetail} />
        <Route path="/auth" component={Auth} />
        <Route path="/register" component={Register} />
        <Route component={NotFound}/>  
        
      </Switch>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />

    </BrowserRouter>
    </AuthContext.Provider>

  );
};

export default App;