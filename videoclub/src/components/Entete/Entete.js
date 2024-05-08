import { NavLink } from "react-router-dom"; 
import './Entete.css'

function Entete() {
    return (
    <header className="entete">
      <div className="wrapper">
        <img src="img\filmflix_logo.png" alt="logo" className="entete-logo"/>
        <nav>
          <NavLink to='liste-films'>Liste des films </NavLink>
        </nav>
      </div>
    </header>
    );
  }
  
  export default Entete;   