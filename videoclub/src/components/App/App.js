import React, { useEffect } from 'react';
import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Entete from "../Entete/Entete";
import "./App.css";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import Admin from "../Admin/Admin";
import { Film } from "../Film/Film";
import {jwtDecode} from "jwt-decode";
import PrivateRoute from '../PrivateRoute/PrivateRoute';
export const AppContext = React.createContext();

function App() {
  let appState = "DEV"
  let apiBaseURL = "https://four1f-tp1-claraquintela-1.onrender.com"

  if(appState === "DEV"){
      apiBaseURL="https://four1f-tp1-claraquintela-1.onrender.com"
    }
 
  const location = useLocation();
  const [user, setUser] = useState({isLogged: false, usager:{}})

  useEffect(()=>{
    const estValide = jetonValide();
    const userData ={
      islogged:estValide,
      usager:{}
    }
    setUser(userData);
  },[])

  async function login(e){
    e.preventDefault();
    const form = e.target;

    const body = {
      courriel: form.courriel.value,
      mdp:form.mdp.value,
    }

    const data = {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    }

    const reponse = await fetch(`${apiBaseURL}/api/utilisateurs/connexion`, data);
    const token = await reponse.json();
    
    if(reponse.status === 200) {
      const userData = {
        isLogged: true,
        usager:{}
      }
      setUser(userData);
      localStorage.setItem("api-film-token", token);
    } else{
      localStorage.removeItem("api-film-token");
    }
  }

  function jetonValide(){
    try {
      const token = localStorage.getItem("api-film-tolken");
      const decode = jwtDecode(token);
      if(token && Date.now() < decode.exp * 1000){
        return true;
      } else {
        localStorage.removeItem("api-film-token");
        return false;
      }
    } catch (erreur) {
        localStorage.removeItem("api-film-token");
        return false;
    } 
  }

  function logout(){
    const userData = {
      isLogged: false,
      usager:{}
    }
    setUser(userData);
    localStorage.removeItem("api-film-token");
  }

  return (
    <AppContext.Provider value={user}>
      {location.pathname !== "/" && <Entete user={user.usager} handleLogin={login} handleLogout={logout}/>}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>

          <Route element={<PrivateRoute/>}>
            <Route path='/admin' element={<Admin/>} />
          </Route>

          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms />} />
          <Route path="/films/:id" element={<Film />} />

        </Routes>
      </AnimatePresence>
    </AppContext.Provider>
  );
  
}

export default App;