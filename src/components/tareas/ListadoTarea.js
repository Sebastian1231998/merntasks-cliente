import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const ListadoTarea = () => {

  const proyectocontext = useContext(proyectoContext);
  
  let { proyecto, eliminarProyecto } = proyectocontext;

  
  const tareacontext = useContext(tareaContext);
  let {  tareas  } = tareacontext;



  console.log(tareas)

  
  
      

  if(!proyecto ) return(

    <h2>Seleccionar Proyecto</h2>
    )

    
  let [proyectoSeleccionado] = proyecto; 


  
  return (
    <Fragment>
      <h2>Proyecto: {proyectoSeleccionado.nombre}</h2>

      <ul className="listado-tareas">
        {tareas.length === 0 ? (
          <li className="tarea">
            <p>No hay Tareas</p>
          </li>
        ) : (
          
          tareas.map((tarea) => 

         
          <Tarea 
          tarea={tarea} 
          proyectoId = {proyectoSeleccionado._id}
          key={tarea._id}

          />)
 
         
        )}
      
      </ul>

      <button
       type="button" 
       className="btn btn-eliminar"
       onClick={()=> eliminarProyecto(proyectoSeleccionado._id) }
       >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTarea;
