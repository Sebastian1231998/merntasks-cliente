import React, { useContext, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  const proyectocontext = useContext(proyectoContext);

  let { proyectos, obtenerProyectos } = proyectocontext;

  useEffect(() => {
    obtenerProyectos();
    // eslint-disable-next-line
  }, []);



  return (
    <ul className="listado-proyectos">
      {proyectos.map((proyecto) => (
        <Proyecto proyecto={proyecto} key={proyecto._id} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
