import {useState, useEffect} from 'react';
import TuileFilm from '../TuileFilm';
import { Link } from 'react-router-dom';
import './ListeFilms.css';
import Dropdown from '../Filtre/Filtre';


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


  const filters = [
    { item: 'Year (asc)',
      thisQuery: "?ordre=asc&selon=annee"
    },
    {
      item:'Year (desc)',
      thisQuery: "?ordre=desc&selon=annee"
    },
    {
      item:'Director (A-Z)',
      thisQuery: "?ordre=asc&selon=realisation"
    },
    {
      item: 'Director (Z-A)',
      thisQuery: "?ordre=desc&selon=realisation"
    },
    {
      item:'Movie (A-Z)',
      thisQuery: "?ordre=asc&selon=titre"
    },
    {
      item: 'Movie (Z-A)',
      thisQuery: "?ordre=desc&selon=titre"
    }     
  ]


  function filtres(queryString){
    setUrlFiltre(`${apiFilms}${queryString}`)
  }


  return (
    <main className='collection'>

      <h1>Browse our collection</h1> 

      <Dropdown 
        label="Refine your seach"
        name="filter"
        list={filters}
        lien={urlFiltre}
        whenChanged={lien => filtres(lien) 
        }
      />

      <div className='collection-tuiles'>    
      {tuilesFilm}
      </div> 
    </main>

  );
}

export default ListeFilms;
