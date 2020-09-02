import React, { useEffect } from 'react'
import "../css/NavBar.css"
//import "../img/biwo-logo.png"
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function NavBar({ color, user, active }) {


    if (!user) {
        let className = 'navbar-landing'
        let className2 = 'navbar__loginlink'
        if (color) {
            className = 'navbar-login';
            className2 = 'navbar-login__hideElements'
        }
        return (
            <nav className={className}>
                <Link to="/"><img
                    className="navbar__logo"
                    src="https://i.ibb.co/wwNdLm1/biwo-logo.png">
                </img></Link>

                <Link to="/iniciarsesion" className={className2}>
                    <Avatar />
                    <div className="navbar__loginlinkElements">
                        <span className="navbar__loginlinkElementsOne">Iniciar </span>
                        <span className="navbar__loginlinkElementsTwo">Sesion</span>
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
                <Link to="/"><img
                    className="navbar__logo"
                    src="https://i.ibb.co/wwNdLm1/biwo-logo.png">
                </img></Link>

                <div className="navbar-login__links">
                    <Link to="/reservar" className={linkClassReservar}  >
                        <h1>Reservar</h1>
                    </Link>
                    <Link to="/misreservas" className={linkClassMisReservas} >
                        <h1>Mis reservas</h1>
                    </Link>
                    <Link to="/administar" className={linkClassAdministrar}   >
                        <h1>Administrar</h1>
                    </Link>
                    <Link to="/ayuda" className={linkClassAyuda} >
                        <h1>Ayuda</h1>
                    </Link>
                    <ExitToAppIcon/>
                    
                </div>

            </nav>
        )
    }


}

export default NavBar
