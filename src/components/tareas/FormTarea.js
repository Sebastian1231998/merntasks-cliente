import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";


const FormTarea = () => {
  let [tarea, guardarTarea] = useState({
    nombre: '',
    proyectoId: '',
  });

  const tareacontext = useContext(tareaContext);

  let { tareaseleccionada,  errorformulario , agregarTarea, actualizaErrorFormulario ,actualizarTarea } = tareacontext;

  useEffect(()=>{

    if(tareaseleccionada !== null){

      guardarTarea(tareaseleccionada)

    }else{

      guardarTarea({
  
        nombre: '',
        proyecto: '',
      })
    }

  },[tareaseleccionada])


  let { nombre } = tarea;

  const proyectocontext = useContext(proyectoContext);

  let { proyecto } = proyectocontext;



 


  if (!proyecto) return null;

  let [proyectoSeleccionado] = proyecto;

  const leerTarea = (e)=>{
    guardarTarea({

      ...tarea,
      [e.target.name]: e.target.value

    })



  }

  const onSubmitTareas = (e) => {

    e.preventDefault();

    if (nombre.trim() === "") {
      actualizaErrorFormulario(); 
      return;
    }
  
    
    if(tareaseleccionada === null){

      tarea.proyecto = proyectoSeleccionado._id;

      agregarTarea(tarea,  tarea.proyecto); 

    }else{

      actualizarTarea(tarea)

    }

   
    
    guardarTarea({
      nombre: "",
      estado: "",
      proyectoId: "",
    })

  };

  return (
    <div className="formulario">

      <form onSubmit={onSubmitTareas}>
        <div className="contenedor-input">
          <input
            type="text"
            placeholder="Nombre de la tarea..."
            name="nombre"
            className="input-text"
            onChange={leerTarea}
            value={nombre}
        
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            value={ tareaseleccionada ? "Editar Tarea": "Agregar Tarea"}
            className="btn btn-primario btn-submit btn-block"
          />
        </div>

      </form>

      
{errorformulario ? <p className="mensaje error"> El Nombre de la Tarea es Obligatorio</p> : null}


    
    </div>
  );
};

export default FormTarea;
