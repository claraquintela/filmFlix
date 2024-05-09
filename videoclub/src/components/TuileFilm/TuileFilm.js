
import './TuileFilm.css';

export function TuileFilm(props) {

  return (
    <article className='tuille-film'>
      <img src={`img/${props.data.titreVignette}`} alt={props.data.titreVignette} className='img-tuille'/>
      <p>{props.data.titre}</p>
      <p>({props.data.annee})</p>
      <p>Directed by {props.data.realisation}</p>
     
    </article>
  );
}
