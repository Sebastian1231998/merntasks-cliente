import React, {useContext} from 'react'
import authContext from "../../context/auth/authContext";

const Barra = () => {

    let authcontext = useContext(authContext);
    let { usuario, cerrarSesion } = authcontext;



    return ( 


        

           <header className="app-header">

            {usuario ?  <p className="nombre-usuario"> Hola <span>{usuario.nombre}</span></p> : null}
               

               <nav className="nav-principal">
               <button 
               className="btn btn-blank cerrar-sesion"
               onClick={()=> cerrarSesion() }
               
               >Cerrar Sesión</button>

               </nav>
           </header>

     );
}
 
export default Barra;