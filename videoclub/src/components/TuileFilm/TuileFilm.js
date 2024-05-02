
import './TuileFilm.css';

function TuileFilm(props) {

  console.log(props);

  return (
    <article>
      <h3>{props.data.titre}</h3>
      <p>{props.data.realisateur}</p>
      <p>{props.data.annee}</p>
    </article>
  );
}

export default TuileFilm;
