import React from 'react'
import "../../css/NavBar.css"
import { Link } from 'react-router-dom';

import {  auth } from '../../firebase';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function SuperAdminNavLinks({active}) {

    const signOutUser = () =>{
        auth.signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            alert(error.message)
          });
        
    }
        
        let linkClassAdminPagos = "navbar-login__link";
        let linkClassAdminReservas = "navbar-login__link";
        let linkClassAdminResidentes = "navbar-login__link";
        let linkClassAdminEdificios= "navbar-login__link";
        let linkClassAdminUsuarios= "navbar-login__link";
        switch (active) {
            case "adminPagos":
                linkClassAdminPagos = "navbar-login__linkActive"
                break;
            case "adminReservas":
                linkClassAdminReservas = "navbar-login__linkActive"
                break;
            case "adminResidentes":
                linkClassAdminResidentes = "navbar-login__linkActive"
                break;
            case "adminEdificios":
                linkClassAdminEdificios = "navbar-login__linkActive"
                break;
            case "adminUsuarios":
                linkClassAdminUsuarios = "navbar-login__linkActive"
                break;
            default:
                break;
        }
    return (
        <div className="navbar-login__links">
                    <Link to={'/adminPagos' } className={linkClassAdminPagos}  >
                        <h1>{'Pagos' }</h1>
                    </Link>
                    <Link to={'/adminReservas'} className={linkClassAdminReservas} >
                        <h1>{'Reservas'}</h1>
                    </Link>
                    <Link to={'/adminResidentes'} className={linkClassAdminResidentes}   >
                        <h1>{'Residentes'}</h1>
                    </Link>
                    <Link to={'/adminEdificios'} className={linkClassAdminEdificios} >
                        <h1>{'Edificios'}</h1>
                    </Link>
                    
                    <Link to={'/adminUsuarios'} className={linkClassAdminUsuarios} >
                        <h1>{'Usuarios Admin'}</h1>
                    </Link>
                    <Link className="navbar-login__linksIcon" to="/" onClick = {signOutUser}  > <ExitToAppIcon  /></Link>

                </div>
    )
}

export default SuperAdminNavLinks
