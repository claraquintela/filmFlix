
import './TuileFilm.css';

export function TuileFilm(props) {

  console.log(props);

  return (
    <article>
      <img src={`img/${props.data.titreVignette}`} alt={props.data.titreVignette}/>
      <p>{props.data.realisateur}</p>
      <p>{props.data.annee}</p>
    </article>
  );
}
