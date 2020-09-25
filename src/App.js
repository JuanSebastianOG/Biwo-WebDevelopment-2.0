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
import {auth} from "./firebase"
import {useStateValue} from "./components/StateProvider";

function App() {

  const [user,dispatch] = useStateValue ();
  const [{userInfo}] = useStateValue();
  

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
  console.log ( 'user is: ', user);
  console.log ( 'user is: ', userInfo);
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
          <NavBar users active="misreservas"/>
            <MyBookings/>
          </Route>
          <Route path="/reservar">
            <NavBar users active="reservar" />
            <Booking/>
          </Route>
          <Route path="/administar">
            <NavBar users active="administrar" />
            <AdminBookings/>
          </Route>
          <Route path="/editarreserva">
            <h1>Editar reserva</h1>
          </Route>
          <Route path="/ayuda">
          <NavBar users active="ayuda" />
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
