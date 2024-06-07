
import './TuileFilm.css';

export function TuileFilm(props) {

  return (
    <article >
      <div className='tuille-film'>
      <img src={`http://localhost:5000/assets/images/${props.data.titreVignette}`} alt={props.data.titreVignette} className='img-tuille'/>
      <div className='tuille-film-content'>
        <p>{props.data.titre}</p>
      </div>
      </div>
     
    </article>
  );
}
