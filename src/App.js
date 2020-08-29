import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/iniciarsesion">
            <NavBar color />
            <Login/>
          </Route>
          <Route path="/registrarse">
           <NavBar color />
           <Register/>

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
          <Route path="/ayuda">
            <h1>Ayuda</h1>
          </Route>
          <Route path="/">
            <NavBar/>
            <img className="app__background" src="https://i.ibb.co/WKDYk04/Grupo-37.png" alt="Grupo-37" border="0"></img>
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
