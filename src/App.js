import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Booking from './components/Booking';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/iniciarsesion">
            <NavBar color />
            <Login />
          </Route>
          <Route path="/registrarse">
            <NavBar color />
            <Register />
          </Route>
          <Route path="/misreservas">
          <NavBar user active="misreservas"/>
            <h1>Mis reservas</h1>
          </Route>
          <Route path="/reservar">
            <NavBar user active="reservar" />
            <Booking/>
          </Route>
          <Route path="/administar">
            <NavBar user active="administrar" />
            <h1>Administar</h1>
          </Route>
          <Route path="/editarreserva">
            <h1>Editar reserva</h1>
          </Route>
          <Route path="/ayuda">
          <NavBar user active="ayuda" />
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
