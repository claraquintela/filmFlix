import {useState, useEffect} from 'react';
import TuileFilm from '../TuileFilm';
import { Link } from 'react-router-dom';
import './ListeFilms.css';


function ListeFilms() {

const [listeFilms, setListeFilms] = useState([]);

const apiFilms = 'https://four1f-tp1-claraquintela-1.onrender.com/api/films'
const [urlFiltre, setUrlFiltre] = useState(apiFilms); 

useEffect(() => {

  fetch(urlFiltre)
    .then(response => response.json())
    .then(data => {setListeFilms(data)} )

}, [urlFiltre])

  const tuilesFilm = listeFilms.map((film, index) => ( 
    <Link to ={`/film/${film.id}`} key={film.id} >
        <TuileFilm  data={film} />
    </Link>
  ));

  function filtres(e, ordre, selon){
    setUrlFiltre(`${apiFilms}?ordre=${ordre}&selon=${selon}`)
  }

  return (
    <main className='collection'>

      <ul>
        <li onClick={(e) => {filtres(e, "asc", "annee")}}>Year (asc)</li>
        <li onClick={(e) => {filtres(e, "asc", "realisation")}}>Director (A-Z)</li>
        <li onClick={(e) => {filtres(e, "asc", "titre")}}>Movie (A-Z)</li>
      </ul>
      <h1>Browse our collection</h1> 

      <div className='collection-tuiles'>    
      {tuilesFilm}
      </div> 
    </main>

  );
}

export default ListeFilms;
