import {useContext} from 'react';
import { AppContext } from "../App/App";
import { NavLink } from "react-router-dom"; 
import './Entete.css';

function Entete({handleLogin, handleLogout}) {

  const context = useContext(AppContext);

    return (
    <header className="entete">
      <div className="wrapper">
        <img src="\img\filmflix_logo_t.png" alt="logo" className="entete-logo"/>
        <nav>
          <NavLink to='liste-films' className="menu-nav-item">Collection</NavLink>
          {context.isLogged ? 
            (<button onClick={handleLogout}>Déconnexion</button>)
          :
          ( <form onSubmit={handleLogin}>
            <input type="email" name="courriel" placeholder="E-mail"/>
            <input type="password" name="mdp" placeholder="Password"/>
            <button>Login</button>
          </form>)
          }
        </nav>
      </div>
     
    </header>
    );
  }
  
  export default Entete;   