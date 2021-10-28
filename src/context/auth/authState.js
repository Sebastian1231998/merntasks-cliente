import React, { useReducer } from "react";
import {
  REGISTRO_ERROR,
  OBTENER_USUARIOS,
  LOGIN_EXITOSO,

} from "../../types";
import authReducer from "./authReducer";
import authContext from "./authContext";
import contextAxios from "../../config/axios";
import authToken from "../../config/token";

const AuthState = (props) => {
  let initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando:true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //funciones

  const crearUsuarioBD = async (datos) => {
    try {
      let respuesta = await contextAxios.post("/api/usuarios", datos);

      console.log(respuesta);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });

      //obtener informacion del usuario
      obtenerUsuario();
    } catch (error) {
      let alerta = {
        msg: error.response.data.msg,
        class: "alerta-error",
      };
      console.log(error.response);
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerUsuario = async () => {
    const token = localStorage.getItem("token");

    console.log(token);
    if (token) {
      console.log("estoy entrando");
      //funcion que envia el token por header
      authToken(token);
    }

    try {
      let respuesta = await contextAxios.get("/api/auth");

      dispatch({
        type: OBTENER_USUARIOS,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);

      let alerta = {
        msg: error.response.data.msg,
        class: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const iniciarSesion = async (datos) => {
    try {
      let respuesta = await contextAxios.post("/api/auth", datos);

      console.log(respuesta.data)
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });

      obtenerUsuario();
    } catch (error) {
      console.log(error.response);

      let alerta = {
        msg: error.response.data.msg,
        class: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const cerrarSesion = ()=>{

    dispatch({
      type: REGISTRO_ERROR
    });
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando:state.cargando,
        crearUsuarioBD,
        iniciarSesion,
        obtenerUsuario,
        cerrarSesion
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
