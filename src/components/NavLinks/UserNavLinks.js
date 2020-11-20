import React from 'react'
import "../../css/NavBar.css"
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {  auth } from '../../firebase';



function UserNavLinks( {active}) {

    const signOutUser = () =>{
        auth.signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            alert(error.message)
          });
        
        }
   
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
        <div className="navbar-login__links">
                    <Link style={{textDecoration: 'none'}} to={'/reservar'}  className={linkClassReservar} >
                        <h1>{'Reservas'}</h1>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to={'/misreservas'}  className={linkClassMisReservas} >
                        <h1>{'Mis Reservas'}</h1>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to={'/administrar'}  className={linkClassAdministrar}    >
                        <h1>{'Administrar'}</h1>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to={'/ayuda'} className={linkClassAyuda} >
                        <h1>{'Ayuda'}</h1>
                    </Link>       
                    <Link className="navbar-login__linksIcon" to="/" onClick = {signOutUser}  > <ExitToAppIcon  /></Link>
        </div>
    )
}

export default UserNavLinks