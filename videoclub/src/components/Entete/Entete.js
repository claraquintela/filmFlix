import { NavLink } from "react-router-dom";  

function Entete() {
    return (
    <header className="entete">
      <div className="WRAPPER">
        <h1>FilmFlix</h1>
        <nav>
          <NavLink to='liste-films'>Liste des films </NavLink>
        </nav>
      </div>
    </header>
    );
  }
  
  export default Entete;