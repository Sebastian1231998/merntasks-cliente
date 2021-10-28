import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import {
  FILTRAR_TAREA,
  AGREGAR_TAREA,
  ERROR_FORMULARIO_TAREA,
  ELIMINAR_TAREA,
  ACTUALIZAR_ESTADO,
  SELECCIONAR_TAREA,
  ACTUALIZAR_TAREA
} from "../../types";
import contextAxios from '../../config/axios'

const TareaState = (props) => {
  const initialState = {
    tareas:[],
    tarea: null,
    errorformulario: false,
    tareaseleccionada:null ,

  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  //crear funciones

  const filtrarTareas = async (proyecto) => {
 
    try{

      let respuesta = await contextAxios.get('/api/tareas', {params: {proyecto}})

   

       dispatch({
        type: FILTRAR_TAREA,
        payload: respuesta.data.tarea
      }); 


    }catch(error){

      console.log(error)
    }

   
  };

  const actualizaErrorFormulario = () => {
  
    dispatch({
      type: ERROR_FORMULARIO_TAREA,
    });
  };

  const agregarTarea = async (tarea, idProyecto) => {


    try{

     


      let respuesta = await contextAxios.post('/api/tareas', tarea , idProyecto)

   

      dispatch({
        type: AGREGAR_TAREA,
        payload: respuesta.data.tarea,
        idProyecto: idProyecto,
      });

    }catch(error){

      console.log(error)
    }
   
  };

  const eliminarTarea = async (idTarea, idProyecto) => {


    try{

      await contextAxios.delete(`/api/tareas/${idTarea}`);
      dispatch({
        type: ELIMINAR_TAREA,
        payload: idTarea,
        idProyecto: idProyecto,
  
      });

    }catch(error){

      console.log(error)

    }
  
  };


   const actualizarEstado = (tarea) => {

    dispatch({
      type: ACTUALIZAR_ESTADO,
      payload: tarea,
     
    });
  };

  const seleccionarTarea = (tarea) =>{


    dispatch({
      type: SELECCIONAR_TAREA,
      payload: tarea
    });

  }


  const actualizarTarea = async (tarea) =>{

    try{
      console.log(tarea)

     await contextAxios.put(`/api/tareas/${tarea._id}`, tarea)

    

      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: tarea
      });
    }catch(error){

      console.log(error)

    }
   
  }


  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tarea: state.tarea,
        errorformulario: state.errorformulario,
        tareaseleccionada:state.tareaseleccionada,
        filtrarTareas,
        agregarTarea,
        actualizaErrorFormulario,
        eliminarTarea,
        actualizarEstado,
        seleccionarTarea,
        actualizarTarea
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
