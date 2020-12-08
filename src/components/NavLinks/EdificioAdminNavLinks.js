import React from 'react'
import "../../css/NavBar.css"
import { Link } from 'react-router-dom';

import {  auth } from '../../firebase';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function EdificioAdminNavLinks({active}) {

    const signOutUser = () =>{
        auth.signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            alert(error.message)
          });
        
    }

    
    

        let linkClassEdPagos = "navbar-login__link";
        let linkClassEdResidentes = "navbar-login__link";
        let linkClassEdReservas = "navbar-login__link";
        let linkClassEdAdminEdificio = "navbar-login__link";
     
        switch (active) {
            case "edAdminPagos":
                linkClassEdPagos = "navbar-login__linkActive"
                break;
            case "edAdminResidentes":
                linkClassEdResidentes = "navbar-login__linkActive"
                break;
            case "edAdminReservas":
                linkClassEdReservas = "navbar-login__linkActive"
                break;
            case "edAdminEdificio":
                linkClassEdAdminEdificio = "navbar-login__linkActive"
                break;
            default:
                break;
        }
    return (
        <div className="navbar-login__links">
                    <Link to={'/edAdminPagos' } className={linkClassEdPagos}  >
                        <h1>{'Pagos' }</h1>
                    </Link>
                    <Link to={'/edAdminResidentes'} className={linkClassEdResidentes} >
                        <h1>{'Residentes'}</h1>
                    </Link>
                    <Link to={'/edAdminReservas'} className={linkClassEdReservas}   >
                        <h1>{'Reservas'}</h1>
                    </Link>
                    
                    <Link className="navbar-login__linksIcon" to="/" onClick = {signOutUser}  > <ExitToAppIcon  /></Link>

                </div>
    )
}

export default EdificioAdminNavLinks
