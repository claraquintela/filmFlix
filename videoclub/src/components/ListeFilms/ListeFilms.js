import {useState, useEffect} from 'react';
import TuileFilm from '../TuileFilm';
import './ListeFilms.css';


function ListeFilms() {

const [listeFilms, setlisteFilms] = useState([]);
const apiFilms = 'https://four1f-tp1-claraquintela-1.onrender.com/api/films';

useEffect(() => {

  fetch(apiFilms)
    .then(response => response.json())
    .then(data => {setlisteFilms(data)} )

}, [])

  const tuilesFilm = listeFilms.map((film, index)=>{ 
     return <TuileFilm key={index} data={film} />;
  })

  return (
    <main >

      <h2> Liste de films</h2>     
      {tuilesFilm} 
    </main>

  );
}

export default ListeFilms;
