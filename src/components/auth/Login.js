import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/auth/authContext";

const Login = (props) => {
  const [login, guardarLogin] = useState({
    email: "",
    password: "",
  });

  let authcontext = useContext(authContext);
  let { autenticado , mensaje , iniciarSesion } = authcontext;

  let alertacontext = useContext(alertaContext);
  let { alerta, mostrarAlerta } = alertacontext;

  useEffect(()=>{

   if(autenticado){

     props.history.push('/proyectos'); 
   }

   if(mensaje){
     mostrarAlerta(mensaje.msg, mensaje.class);
   }


    // eslint-disable-next-line
 }, [autenticado, mensaje, props.history ])




  let { email, password } = login;

  const onChange = (e) => {
    guardarLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesionComponent = (e) => {

   e.preventDefault(); 

    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("todos los campos son obligatorios", "alerta-error");
      return; 
    }


    iniciarSesion({
      email,
      password
    })

  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>

        <form onSubmit={iniciarSesionComponent}>
          <div className="campo-form">
            <label htmlFor="email">Email: </label>

            <input
              type="email"
              placeholder="Tu Email"
              name="email"
              id="email"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password: </label>

            <input
              type="password"
              placeholder="Tu Password"
              name="password"
              id="password"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              name="login"
              id="login"
              className="btn btn-block btn-primario"
            />
          </div>

          <Link to={"/crear-cuenta"} className="enlace-cuenta">
            Crear Cuenta
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
