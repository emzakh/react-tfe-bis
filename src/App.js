import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Produits from './pages/Produits';
import ProduitDetail from './components/ProduitDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} /> 
        <Route path="/a-propos" component={About}/>
        <Route path="/produits" exact component={Produits}/>
        <Route path="/produits/:id" component={ProduitDetail} />
        <Route component={NotFound}/>  
        
      </Switch>
    </BrowserRouter>
  );
};

export default App;