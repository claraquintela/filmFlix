import {useContext} from 'react';
import { AppContext } from "../App/App";
import { NavLink } from "react-router-dom"; 
import './Entete.css';

function Entete({handleLogin, handleLogout, user}) {

  const context = useContext(AppContext);

    return (
    <header >
      <div>
        {context.isLogged ? 
          (<div>
              <NavLink to="/admin">Admin</NavLink>
              <button onClick={handleLogout} className='logout-form'>Déconnexion</button>
            </div>
          )
          :
          ( <form className='login-form' onSubmit={handleLogin}>
            <input type="email" name="courriel" placeholder="E-mail"/>
            <input type="password" name="mdp" placeholder="Password"/>
            <button>Login</button>
          </form>)
          }
       </div>  
      <div className="wrapper">
      <div>
      <NavLink to='liste-films'><img src="\img\filmflix_logo_t.gif" alt="logo" className="entete-logo"/></NavLink>
        </div>
       <div>
          <NavLink to='liste-films' className="menu-nav-item">Collection</NavLink>
          </div>
        
      </div>
     
    </header>
    );
  }
  
  export default Entete;   