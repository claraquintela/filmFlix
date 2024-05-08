import { NavLink } from "react-router-dom"; 
import './Entete.css'

function Entete() {
    return (
    <header className="entete">
      <div className="wrapper">
        <img src="img\filmflix_logo_t.png" alt="logo" className="entete-logo"/>
        <nav>
          <NavLink to='liste-films' className="menu-nav-item">Collection</NavLink>
        </nav>
      </div>
    </header>
    );
  }
  
  export default Entete;   