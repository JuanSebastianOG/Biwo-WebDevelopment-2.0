import React from 'react'
import "../css/NavBar.css"
//import "../img/biwo-logo.png"
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core"


function NavBar({ color }) {
    
    let className = 'navbar-landing'
    let className2 = 'navbar__loginlink'
    if (color) {
        className = 'navbar-login';
        className2 = 'navbar-login__hideElements'
    }
    return (

        <nav className={className}>
            <img
                className="navbar__logo"
                src="https://i.ibb.co/wwNdLm1/biwo-logo.png">
            </img>
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

export default NavBar
