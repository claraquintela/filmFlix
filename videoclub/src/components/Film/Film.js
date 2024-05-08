import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './Film.css';

export function Film(props) {

  //pour avoir l'id passé dans la query string
    const { id } = useParams();
    const [film, setfilm] = useState(null);
  
    const urlFilm = `https://four1f-tp1-claraquintela-1.onrender.com/api/films/${id}`;
    
    useEffect(() => {
      fetch(urlFilm)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setfilm(data);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    }, [urlFilm, id]);
    
    if (!film) {
      return <div>Données pas trouvées</div>;
    }

    return (
      <main>
      <div className="page-film">
        
        <div className="page-film_wrapper">
          <img src={`/img/${film.titreVignette}`} alt={film.titre} />
          <div className="page-film_content">
            <h2>{film.titre}</h2>
            <p><span>Directed by</span> {film.realisateur}</p>
            <p><span>Year:</span> {film.annee}</p>
            <p><span>Description:</span> {film.description}</p>
          </div>
        </div>
      </div>
      </main>
    );
  }
  
  export default Film;