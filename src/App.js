import React from 'react';
import './App.css';
import './bootstrap/css/bootstrap.min.css';
import {useState} from 'react';
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
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem("token");

  localStorage.setItem("serveurURL", "http://localhost:5000");

  const handleClick = async () => {
    const data = await fetch('/api/test');
    const json = await data.json();
    const msg = json.msg;

    setMsg(msg);
  }
  
  if(!token) {
    
    return <div className="App"> 
      <FormAuthent setToken={setToken} />
      <BrowserRouter>
      <Route path="/inscription" component={FormInscription}></Route>
      </BrowserRouter>
      </div>
  }

  return ( 
    <div className="App"> 
      <BrowserRouter>
        <NavBar></NavBar>
        <Route path="/connexion" component={FormAuthent}></Route>
        <Route path="/inscription" component={FormInscription}></Route>
        <Route path="/profil" component={Profil}></Route>
        <Route path="/recherche" component={rechercheUtilisateurs}></Route>
        <button onClick={handleClick}>
          Hello World !
        </button>
        <p>{msg}</p>
      </BrowserRouter>
    </div>
  );
}

export default App;
