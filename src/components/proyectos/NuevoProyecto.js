import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  let { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const proyectocontext = useContext(proyectoContext);

  let {
    formulario,
    errorFormulario,
    activaFormulario,
    agregarProyecto,
    actualizaErrorFormulario,
  } = proyectocontext;

  const guardaProyecto = (e) => {
    e.preventDefault();

    if (nombre === "") {
      actualizaErrorFormulario();
      return null;
    }

    agregarProyecto(proyecto);

    guardarProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        onClick={() => activaFormulario()}
        type="button"
        className="btn btn-block btn-primario"
      >
        Nuevo Proyecto
      </button>

      {errorFormulario ? (
        <p className="mensaje error">El nombre de proyecto es obligatorio</p>
      ) : null}

      {formulario ? (
        <form onSubmit={guardaProyecto} className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            onChange={onChangeProyecto}
            value={nombre}
          ></input>

          <input
            type="submit"
            className="btn btn primario btn-block"
            value="Agregar Proyecto"
          ></input>
        </form>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
