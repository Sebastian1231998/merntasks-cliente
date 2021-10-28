import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  let authcontext = useContext(authContext);

  let { cargando, autenticado, obtenerUsuario } = authcontext;

 

  useEffect(()=>{
      
      obtenerUsuario()
     // eslint-disable-next-line
  }, [])

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default RutaPrivada;
