import { useContext } from "react";
import { AppContext } from "../App/App";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () =>{
    const context =useContext(AppContext); // Objet user, isLogged

    if(context.isLogged) {
        return <Outlet/>;
    }else{
        return <Navigate to="/"/>
    }

   
}

export default PrivateRoute;