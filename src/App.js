import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Booking from './components/Booking';
import AdminBookings from './components/AdminBookings';
import MyBookings from './components/MyBookings';
import Landing from './components/Landing';
import Help from './components/Help';

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
            <MyBookings/>
          </Route>
          <Route path="/reservar">
            <NavBar user active="reservar" />
            <Booking/>
          </Route>
          <Route path="/administar">
            <NavBar user active="administrar" />
            <AdminBookings/>
          </Route>
          <Route path="/editarreserva">
            <h1>Editar reserva</h1>
          </Route>
          <Route path="/ayuda">
          <NavBar user active="ayuda" />
            <Help/>
          </Route>
          <Route path="/">
            <NavBar />
            <Landing/>
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
