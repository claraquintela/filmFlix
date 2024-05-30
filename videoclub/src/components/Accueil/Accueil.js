
import { Link } from 'react-router-dom';
import './Accueil.css';

function Accueil() {
  return (
    <div>
    <Link to="/liste-films">
      <img src="\img\logo_effects.gif" alt="Logo" />
    </Link>
  </div>
  );
}

export default Accueil;
