import React from 'react'
import "../css/NavBar.css"
//import "../img/biwo-logo.png"
import { Link } from 'react-router-dom';


function NavBar() {
    return (
            <nav className = "navbar">
                <img 
                className="navbar__logo" 
                src="https://i.ibb.co/wwNdLm1/biwo-logo.png"></img>
                 <Link to="/" className="loginlink">
                    <div className="navbar__login">
                        <span className="navbar__loginOne">Iniciar </span>
                        <span className="navbar__loginTwo">Sesion</span>
                    </div>
                </Link>
            </nav>
    )
}

export default NavBar
