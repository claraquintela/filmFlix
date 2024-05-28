import React from 'react';
import { useState } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Entete from "../Entete/Entete";
import "./App.css";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import Admin from "../Admin/Admin";
import { Film } from "../Film/Film";
export const AppContext = React.createContext();

function App() {
  
    const location = useLocation();

  // const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({isLogged: false, nom:''})

  function login(e){
    e.preventDefault();
    let user = e.target.user.value
    if(user === 'admin'){
      setUser(prevUser => ({...prevUser, isLogged: true, nom: user}));
      e.target.reset();
    }

  }

  return (
    <AppContext.Provider value={user}>
      <Entete handleLogin={login} />
      <AnimatePresence mode="wait">

      <Routes location={location} key={location.key}>
   
        <Route path="/" element={<Accueil />}/>
        <Route path="/liste-films" element={<ListeFilms />}/>
        <Route path="/films/:id" element={<Film />} />
        <Route path='/admin' element={user.isLogged ? <Admin/> : <Navigate to='/' />}/>
    
      </Routes>
   
    </AnimatePresence>
    </AppContext.Provider>
  );
}

export default App;