import React,{useEffect} from 'react';
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
import ReceiptList from './components/BiwoAdmin/ReceiptList';
import ReceiptsPayment from './components/BuildingAdmin/ReceiptsPayment';
import BuildingsList from './components/BiwoAdmin/BuildingsList';
import { auth } from './firebase';
import {useStateValue} from './components/StateProvider'

import AddAdmin from './components/AddAdmin';
import BookingsList from './components/BiwoAdmin/BookingsList';

function App() {

  const [user,dispatch] = useStateValue ();
  console.log(user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser)
      {
        dispatch({
          type: "USER_SIGN_IN/OUT",
          user: authUser
        })
      }
      else{
        dispatch({
          type: "USER_SIGN_IN/OUT",
          user: null
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
 
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






          <Route path="/adminRecibos">
            <NavBar users active="adminRecibos" usertype={"superadmin"} />
            <h1>Reporte de Recibos</h1>
            <ReceiptList></ReceiptList>
            
          </Route>

          <Route path="/adminReservas">
            <NavBar users active="adminReservas" usertype={"superadmin"} />
            <h1>Reporte de Reservas</h1>
            <BookingsList></BookingsList>
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





          <Route users path="/edAdminPagos">
            <NavBar users active="edAdminPagos" usertype={"edAdmin"} />
            <h1>Pagos Edificio</h1>
            <ReceiptsPayment></ReceiptsPayment>
          </Route>
          <Route users path="/edAdminResidentes">
            <NavBar users active="edAdminResidentes" usertype={"edAdmin"} />
            <h1>Residentes Edificio</h1>
          </Route>
          <Route users path="/edAdminReservas">
            <NavBar users active="edAdminReservas" usertype={"edAdmin"} />
            <h1>Reservas Edificio</h1>
          </Route>
          <Route users path="/edAdminEdificio">
            <NavBar users active="edAdminEdificio" usertype={"edAdmin"} />
            <h1>Administracion Edificio</h1>
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
