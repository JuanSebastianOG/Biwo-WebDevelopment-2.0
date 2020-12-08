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
import ResidentList from './components/BiwoAdmin/ResidentList';
import ReceiptList from './components/BiwoAdmin/ReceiptList';
import ReceiptsPayment from './components/BuildingAdmin/ReceiptsPayment';
import ResidentBuildingList from './components/BuildingAdmin/ResidentBuildingList';
import BookingsBuildingList from './components/BuildingAdmin/BookingsBuildingList';
import BuildingsList from './components/BiwoAdmin/BuildingsList';
import { auth } from './firebase';
import {useStateValue} from './components/StateProvider'
import { useHistory } from "react-router-dom";


import AddAdmin from './components/AddAdmin';
import styled from 'styled-components'; 
import BookingsList from './components/BiwoAdmin/BookingsList';
import Feedback from './components/Feedback';

const StyledTitle= styled.h1`
 margin-top:40px;
    margin-left:80px;
    color: #002980;
    font-weight: 700;
    display: block;
`;

function App() {

  const [user,dispatch] = useStateValue ();
  console.log(user)
  const history = useHistory();
  useEffect(() => {

    if(auth.currentUser)
    {
      auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Confirm the user is an Admin.
        if (idTokenResult.claims.superadmin) {
          history.push("/adminRecibos");
        } else if(idTokenResult.claims.admin) {
          history.push("/edAdminPagos");
        }
        else{
          history.push("/reservar");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Route path="/feedback">
            <NavBar users active="misreservas" usertype={"residente"} />
            <Feedback />
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
            <StyledTitle>Reporte de Recibos</StyledTitle>
            <ReceiptList></ReceiptList>
            
          </Route>

          <Route path="/adminReservas">
            <NavBar users active="adminReservas" usertype={"superadmin"} />
            <StyledTitle>Reporte de Reservas</StyledTitle>
            <BookingsList></BookingsList>
          </Route>

          <Route path="/adminResidentes">
            <NavBar users active="adminResidentes" usertype={"superadmin"} />
            <StyledTitle>Reporte de Residentes</StyledTitle>
            <ResidentList />
          </Route>
          <Route users path="/adminEdificios">
            <NavBar users active="adminEdificios" usertype={"superadmin"} />
            <StyledTitle>Reporte de Edificios</StyledTitle>
            <BuildingsList/>
          </Route>
          <Route users path="/adminUsuarios">
            <NavBar users active="adminUsuarios" usertype={"superadmin"} />
            <AddAdmin></AddAdmin>
          </Route>





          <Route users path="/edAdminPagos">
            <NavBar users active="edAdminPagos" usertype={"edAdmin"} />
            <StyledTitle>Pagos Edificio</StyledTitle>
            <ReceiptsPayment></ReceiptsPayment>
          </Route>
          <Route users path="/edAdminResidentes">
            <NavBar users active="edAdminResidentes" usertype={"edAdmin"} />
            <StyledTitle>Residentes Edificio</StyledTitle>
            <ResidentBuildingList></ResidentBuildingList>
          </Route>
          <Route users path="/edAdminReservas">
            <NavBar users active="edAdminReservas" usertype={"edAdmin"} />
            <StyledTitle>Reservas Edificio</StyledTitle>
            <BookingsBuildingList></BookingsBuildingList>
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
