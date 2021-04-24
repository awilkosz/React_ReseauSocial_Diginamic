import React from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./component/navbar";
import FormAuthent from './component/formAuth';
import FormInscription from './component/formInscription';
import Profil from './component/profil';
import rechercheUtilisateurs from './component/recherche';

const setToken = (userToken) => {
  sessionStorage.setItem('token', JSON.stringify(userToken));
} 

const App = () => {
  const token = localStorage.getItem("token");

  localStorage.setItem("serveurURL", "https://node-reseau-social-diginamic.herokuapp.com");

  if(!token) {
    
    return (<div className="App">
      <h1>Bienvenue sur Digisocial !</h1>
      <FormAuthent setToken={setToken} />
      <BrowserRouter>
      <Route path="/inscription" component={FormInscription}></Route>
      </BrowserRouter>
      </div>)
  }

  return ( 
    <div className="App"> 
        <BrowserRouter>
        <NavBar></NavBar>
        <Route path="/connexion" component={FormAuthent}></Route>
        <Route path="/inscription" component={FormInscription}></Route>
        <Route path="/profil" component={Profil}></Route>
        <Route path="/recherche" component={rechercheUtilisateurs}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
