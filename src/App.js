import React, { useState } from 'react';
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
import ResidentList from './components/BuildingAdmin/ResidentList';
import BuildingsList from './components/BiwoAdmin/BuildingsList';

import AddAdmin from './components/AddAdmin';

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
            <NavBar users active="misreservas" usertype={"residente"} />
            <MyBookings />
          </Route>

          <Route path="/reservar">
            <NavBar users active="reservar" usertype={"residente"} />
            <Booking />
          </Route>

          <Route path="/administrar">
            <NavBar users active="administrar" usertype={"residente"} />
            <AdminBookings />
          </Route>

          <Route path="/ayuda">
            <NavBar users active="ayuda" usertype={"residente"} />
            <Help />
          </Route>

          <Route path="/adminPagos">
            <NavBar users active="adminPagos" usertype={"superadmin"} />
            <h1>Reporte de Pagos</h1>
          </Route>

          <Route path="/adminReservas">
            <NavBar users active="adminReservas" usertype={"superadmin"} />
            <h1>Reporte de Reservas</h1>
          </Route>

          <Route path="/adminResidentes">
            <NavBar users active="adminResidentes" usertype={"superadmin"} />
            <h1>Reporte de Residentes</h1>
            <ResidentList />
          </Route>
          <Route users path="/adminEdificios">
            <NavBar users active="adminEdificios" usertype={"superadmin"} />
            <h1>Reporte de Edificios</h1>
            <BuildingsList/>
          </Route>
          <Route users path="/adminUsuarios">
            <NavBar users active="adminUsuarios" usertype={"superadmin"} />
            <AddAdmin></AddAdmin>
          </Route>

          <Route path="/">
            <NavBar usertype={false} />
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
