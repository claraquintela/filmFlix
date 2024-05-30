import {useState, useEffect} from 'react';
import TuileFilm from '../TuileFilm';
import { Link } from 'react-router-dom';
import './ListeFilms.css';
import Filtre from '../Filtre/Filtre';
import { motion } from "framer-motion";
import Loading from '../Loading/Loading';


function ListeFilms() {

const [listeFilms, setListeFilms] = useState([]);
const apiFilms = 'https://apifilm-4kgi.onrender.com/films'
const [urlFiltre, setUrlFiltre] = useState(apiFilms); 
const [estCharge, setEstCharge] = useState(false);

useEffect(() => {

  fetch(urlFiltre)
    .then(response => response.json())
    .then(data => {
      setListeFilms(data);
      setEstCharge(true);
    } )

}, [urlFiltre])

  const tuilesFilm = listeFilms.map((film, index) => ( 
    <Link to ={`/films/${film.id}`} key={film.id} >
        <TuileFilm  data={film} />
    </Link>
  ));

  const filters = [
    { item: 'Year (asc)',
      thisQuery: "?orderDirection=asc&orderBy=annee"
    },
    {
      item:'Year (desc)',
      thisQuery: "?orderDirection=desc&orderBy=annee"
    },
    {
      item:'Director (A-Z)',
      thisQuery: "?orderDirection=asc&orderBy=realisation"
    },
    {
      item: 'Director (Z-A)',
      thisQuery: "?orderDirection=desc&orderBy=realisation"
    },
    {
      item:'Movie (A-Z)',
      thisQuery: "?orderDirection=asc&orderBy=titre"
    },
    {
      item: 'Movie (Z-A)',
      thisQuery: "?orderDirection=desc&orderBy=titre"
    }     
  ]

  function filtres(queryString){
    setUrlFiltre(`${apiFilms}${queryString}`)
  }

  const transition = { duration: 1.5, ease: "easeInOut" };
  const animationBasVersHaut = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  };

  return (
    <main className='collection'>


      <Filtre
        label="Refine your seach"
        name="filter"
        list={filters}
        lien={urlFiltre}
        whenChanged={lien => filtres(lien) 
        }
      />
      {estCharge ? (
        <motion.div
          key="liste-film"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationBasVersHaut}
        >
          <div className='collection-tuiles'>    
            {tuilesFilm}
          </div> 
        </motion.div>
      ) : ( <Loading/>)}

    </main>

  );
}

export default ListeFilms;
