import proyectoReducer from "./proyectoReducer";
import { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import contextAxios from '../../config/axios'

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  ERROR_FORMULARIO_PROYECTO,
  PROYECTO_SELECCIONADO,
  ELIMINAR_PROYECTO
} from "../../types";

const ProyectoState = (props) => {
 


  const stateInicial = {
    formulario: false,
    proyectos: [],
    proyecto: null,
    errorFormulario: false,
  };

  const [state, dispatch] = useReducer(proyectoReducer, stateInicial);

  const activaFormulario = () => {
    dispatch({
      types: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = async () => {
    try{
     
       let respuesta = await contextAxios.get('/api/proyectos');

      dispatch({
        types: OBTENER_PROYECTO,
        payload: respuesta.data.proyectos,
      });
    }catch(error){

      console.log(error)
    }
    
  };

  const agregarProyecto = async (proyecto) => {


    try{


      let respuesta = await contextAxios.post('/api/proyectos', proyecto);

      console.log(respuesta.data.proyecto)

      dispatch({
        types: AGREGAR_PROYECTO,
        payload: respuesta.data.proyecto
      });
    }catch(error){

      console.log(error)
    }

   
  };

  const actualizaErrorFormulario = () => {
    dispatch({
      types: ERROR_FORMULARIO_PROYECTO,
    });
  };

  const seleccionProyecto = (proyectoId) => {

    dispatch({
      types: PROYECTO_SELECCIONADO,
      payload: proyectoId,
    });

  };

  const eliminarProyecto = async (proyectoId) => {

    try{

      let respuesta = await contextAxios.delete(`/api/proyectos/${proyectoId}`); 

      console.log(respuesta)


      dispatch({
        types: ELIMINAR_PROYECTO,
        payload: proyectoId,
  
      });

    }catch(error){

      console.log(error)
    }
 
  
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        obtenerProyectos,
        activaFormulario,
        agregarProyecto,
        actualizaErrorFormulario,
        seleccionProyecto,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
