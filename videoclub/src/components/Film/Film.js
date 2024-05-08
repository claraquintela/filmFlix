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
      <div className="page-film">
        <h1>{film.titre}</h1>
        <div className="page-film_wrapper">
          <img src={`/img/${film.titreVignette}`} alt={film.titre} />
          <div className="page-film_content">
          <p><span>Réealisateur:</span> {film.realisateur}</p>
          <p><span>Année:</span> {film.annee}</p>
          <p><span>Description:</span> {film.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Film;