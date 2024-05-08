import {useState, useEffect} from 'react';
import TuileFilm from '../TuileFilm';
import { Link } from 'react-router-dom';
import './ListeFilms.css';


function ListeFilms() {

const [listeFilms, setlisteFilms] = useState([]);
const apiFilms = 'https://four1f-tp1-claraquintela-1.onrender.com/api/films';

useEffect(() => {

  fetch(apiFilms)
    .then(response => response.json())
    .then(data => {setlisteFilms(data)} )

}, [])

  const tuilesFilm = listeFilms.map((film, index) => ( 
  <Link to ={`/film/${film.id}`} key={film.id} >
      <TuileFilm  data={film} />
    </Link>
  ));

  return (
    <main >
      <h2> Liste de films</h2>     
      {tuilesFilm} 
    </main>

  );
}

export default ListeFilms;
