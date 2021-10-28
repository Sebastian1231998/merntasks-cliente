import React, { Fragment, useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTarea from "../tareas/ListadoTarea";
import authContext from "../../context/auth/authContext";


const Proyectos = (props) => {

  let authcontext = useContext(authContext);

  let {  obtenerUsuario } = authcontext; 

  useEffect(()=>{
      obtenerUsuario()
      // eslint-disable-next-line
  }, [])


  return (
    <Fragment>
      <div className="contenedor-app">
        <Sidebar />
        <div className="seccion-principal">
        <Barra />
          <main>

           <FormTarea />
            <div className="contenedor-tareas">
            
            <ListadoTarea />
            
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Proyectos;
