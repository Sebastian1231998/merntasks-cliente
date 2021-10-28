import React, { useState, useContext, useEffect } from "react";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const CrearCuenta = (props) => {
  const [crearCuenta, guardarCrearCuenta] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmaPassword: "",
  });

  let authcontext = useContext(authContext);
  let { autenticado, mensaje , crearUsuarioBD } = authcontext;

  useEffect(()=>{

    if(autenticado){

      props.history.push('/proyectos'); 
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg,mensaje.class);
    }


    // eslint-disable-next-line
  }, [autenticado, mensaje, props.history ])

  let { nombre, email, password, confirmaPassword } = crearCuenta;





  let alertacontext = useContext(alertaContext);

  let { alerta, mostrarAlerta } = alertacontext;

  const onChange = (e) => {
    guardarCrearCuenta({
      ...crearCuenta,
      [e.target.name]: e.target.value,
    });
  };

  const crearUsuario = (e) => {
    e.preventDefault();

    //validar que los campos no esten vacios

    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmaPassword.trim() === ""
    ) {
      mostrarAlerta("todos los campos son obligatorios", "alerta-error");
      return;
    }
    //validar que los passwords sean mayores a 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de mas de 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //validar que los passwords sean iguales
    if (password !== confirmaPassword) {
      mostrarAlerta("Los passwords deben ser iguales", "alerta-error");
      return;
    }

    crearUsuarioBD({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}


      <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>

        <form onSubmit={crearUsuario}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre: </label>

            <input
              type="text"
              placeholder="Tu Nombre"
              name="nombre"
              id="nombre"
              onChange={onChange}
            />
          </div>

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
            <label htmlFor="confirmarPassword">Confirmar Password: </label>

            <input
              type="password"
              placeholder="Confirma tu Password"
              name="confirmaPassword"
              id="confirmaPassword"
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
          <Link to={"/"} className="enlace-cuenta">
            Iniciar Sesión
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;
