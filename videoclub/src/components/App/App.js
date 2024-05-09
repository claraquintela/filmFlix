import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entete from "../Entete/Entete";
import "./App.css";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import { Film } from "../Film/Film";

function App() {

  return (
    <Router>
      <Entete />
      <Routes>
        <Route path="/" element={<Accueil />}/>
        <Route path="/liste-films" element={<ListeFilms />}/>
        <Route path="/film/:id" element={<Film />} />
      </Routes>
    </Router>
  );
}

export default App;