import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import CrearCuenta from "./components/auth/CrearCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/auth/authState";
import authToken from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";

function App() {


  let token = localStorage.getItem('token'); 

  if(token){

    authToken(token)

  }



  return (
    <ProyectoState>
      <TareaState>
        <AuthState>
          <AlertaState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route
                  exact
                  path="/crear-cuenta"
                  component={CrearCuenta}
                ></Route>
                <RutaPrivada exact path="/proyectos" component={Proyectos}></RutaPrivada>
              </Switch>
            </Router>
          </AlertaState>
        </AuthState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
