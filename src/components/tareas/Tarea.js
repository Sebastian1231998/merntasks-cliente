import React , {useContext} from "react";
import tareaContext from "../../context/tareas/tareaContext";


const Tarea = ({ tarea, proyectoId }) => {



  const tareacontext = useContext(tareaContext);

  let {  eliminarTarea, filtrarTareas, actualizarTarea, seleccionarTarea  } = tareacontext;

  const onClickEliminarTarea = ()=>{

 
    eliminarTarea(tarea._id, proyectoId);
    filtrarTareas(proyectoId); 

  }

  const actualizaEstado = (e)=>{

    if(tarea.estado) {

      tarea.estado = false;
    }else{

      tarea.estado = true;

    }


    actualizarTarea(tarea)

  }

  const onClickSeleccionarTarea = ()=>{
    seleccionarTarea(tarea)
  }


  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado ? (
          <button 
          type="button" 
          className="completo"
          onClick={actualizaEstado}
          >Completo</button>
        ) : (
          <button type="button"
           className="incompleto"
           onClick={actualizaEstado}
           >Incompleto</button>
        )}
        </div>

        <div className="acciones">
          <button 
          type="button" 
          className="btn btn-secundario"
          onClick={onClickSeleccionarTarea}
          >Editar</button>

          <button 
          type="button"
          className="btn btn-primario"
          onClick = {onClickEliminarTarea}
          >Eliminar</button>
        </div>

    </li>
  );
};

export default Tarea;
