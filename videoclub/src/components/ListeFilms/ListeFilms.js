
import TuileFilm from '../TuileFilm/TuileFilm';
import './ListeFilms.css';

function ListeFilms() {

  const listeFilms = [
    { titre: "Star Wars", realisateur: "George Lucas", annee:"1979"},
    { titre: "Star Wars", realisateur: "George Lucas", annee:"1979"},
    { titre: "Star Wars", realisateur: "George Lucas", annee:"1979"},
    { titre: "Star Wars", realisateur: "George Lucas", annee:"1979"}
  ];

  const tuilesFilm = listeFilms.map((film, index)=>{
    return <TuileFilm key={index} data={film} />
  })

  return (
    <main >
      <h2> Liste de films</h2>
      {tuilesFilm}
    </main>
  );
}

export default ListeFilms;
