import React from 'react'
import "../css/NavBar.css"
//import "../img/biwo-logo.png"
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Burger from './Burger';
import {useStateValue} from "./StateProvider";
import {  auth } from '../firebase';

function NavBar({ color, users, active, admin }) {

    const signOutUser = () =>{
        auth.signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            alert(error.message)
          });
        
    }
    const [{user}] = useStateValue();
    if (!users) {
        let className = 'navbar-landing'
        let className2 = 'navbar__loginlink'
        if (color) {
            className = 'navbar-login';
            className2 = 'navbar-login__hideElements'
        }
        return (
            <nav className={className}>
                <Link to="/">
                    <img
                        alt=""
                        className="navbar__logo"
                        src="https://i.ibb.co/wwNdLm1/biwo-logo.png">
                    </img>
                </Link>

                <Link to={user ? '/reservar' : '/iniciarsesion'} className={className2}>
                    <Avatar />
                    <div className="navbar__loginlinkElements">
                        <span className="navbar__loginlinkElementsOne">{user ? 'Mis' : 'Iniciar'} </span>
                        <span className="navbar__loginlinkElementsTwo">{user ? 'Reservas' : 'Sesión'}</span>
                    </div>
                </Link>
            </nav>
        )
    }
    else {
        let linkClassReservar = "navbar-login__link";
        let linkClassMisReservas = "navbar-login__link";
        let linkClassAdministrar = "navbar-login__link";
        let linkClassAyuda = "navbar-login__link";
        switch (active) {
            case "reservar":
                linkClassReservar = "navbar-login__linkActive"
                break;
            case "administrar":
                linkClassAdministrar = "navbar-login__linkActive"
                break;
            case "misreservas":
                linkClassMisReservas = "navbar-login__linkActive"
                break;
            case "ayuda":
                linkClassAyuda = "navbar-login__linkActive"
                break;
            default:
                break;
        }

        return (

            <nav className='navbar-login'>
                <Link to="/">
                    <img
                        alt=""
                        className="navbar__logo"
                        src="https://i.ibb.co/wwNdLm1/biwo-logo.png">
                    </img>
                </Link>

                <div className="navbar-login__links">
                    <Link to={admin ?  '/adminPagos' : '/reservar'} className={linkClassReservar}  >
                        <h1>{admin ? 'Pagos' : 'Reservas'}</h1>
                    </Link>
                    <Link to={admin ?  '/adminReservas' : '/misreservas'} className={linkClassMisReservas} >
                        <h1>{admin ? 'Reservas' : 'Mis Reservas'}</h1>
                    </Link>
                    <Link to={admin ?  '/adminResidentes' : '/administrar'} className={linkClassAdministrar}   >
                        <h1>{admin ? 'Residentes' : 'Administrar'}</h1>
                    </Link>
                    <Link to={admin ?  '/adminEdificios' : '/ayuda'} className={linkClassAyuda} >
                        <h1>{admin ? 'Edificios' : 'Ayuda'}</h1>
                    </Link>
                    <Link className="navbar-login__linksIcon" to="/" onClick = {signOutUser}  > <ExitToAppIcon  /></Link>


                </div>
                <Burger />


            </nav>



        )
    }


}

export default NavBar
