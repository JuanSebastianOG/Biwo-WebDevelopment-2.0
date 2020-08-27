import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/inicarsesion">
            <h1>Iniciar Sesion</h1>
          </Route>
          <Route path="/registrarse">
            <h1>Registrarse</h1>
          </Route>
          <Route path="/misreservas">
            <h1>Mis Reservas</h1>
          </Route>
          <Route path="/reservar">
            <h1>Reservar</h1>
          </Route>
          <Route path="/administar">
            <h1>Administar</h1>
          </Route>
          <Route path="/editarreserva">
            <h1>Editar reserva</h1>
          </Route>
          {
            /*Administrar es lo mismo que editar*/
          }
          <Route path="/ayuda">
            <h1>Ayuda</h1>
          </Route>
          <Route path="/">
            <NavBar />
            <img className="app__background" src="https://i.ibb.co/WKDYk04/Grupo-37.png" alt="Grupo-37" border="0"></img>
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
