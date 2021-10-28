import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {


  const proyectocontext = useContext(proyectoContext);
  let {  seleccionProyecto } = proyectocontext;

  const tareacontext = useContext(tareaContext);
  let {  filtrarTareas } = tareacontext;

  const seleccionaNuevoProyecto = ()=>{

    seleccionProyecto(proyecto._id)
    filtrarTareas(proyecto._id)

  }


  return (
    <li onClick={ seleccionaNuevoProyecto }>
      <button className="btn btn-blank">{proyecto.nombre}</button>
    </li>
  );
};

export default Proyecto;
