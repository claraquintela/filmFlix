import {useContext} from 'react';
import { AppContext } from "../App/App";
import { NavLink } from "react-router-dom"; 
import './Entete.css'

function Entete(props) {

  const context = useContext(AppContext);

    return (
    <header className="entete">
      <div className="wrapper">
        <img src="\img\filmflix_logo_t.png" alt="logo" className="entete-logo"/>
        <nav>
          <NavLink to='liste-films' className="menu-nav-item">Collection</NavLink>
          {context.isLogged ? <NavLink to='admin'>Admin</NavLink> : ''}
        </nav>
      </div>
      <form onSubmit={props.handleLogin}>
        {/* <input ref={elUser} type="text" name="user" placeholder="User"/> */}
        <input type="text" name="user" placeholder="User"/>
        <button>Login</button>
      </form>
    </header>
    );
  }
  
  export default Entete;   