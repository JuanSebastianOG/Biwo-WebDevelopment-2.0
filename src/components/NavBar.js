import React from 'react'
import "../css/NavBar.css"
//import "../img/biwo-logo.png"
import { Link } from 'react-router-dom';


function NavBar() {
    return (
            <nav className = "navbar">
                <img 
                className="navbar__logo" 
                src="https://i.ibb.co/wwNdLm1/biwo-logo.png">
                </img>
                 <Link to="/inicarsesion" className="navbar__loginlink">
                    <div className="navbar__loginlinkElements">
                        <span className="navbar__loginlinkElementsOne">Iniciar </span>
                        <span className="navbar__loginlinkElementsTwo">Sesion</span>
                    </div>
                </Link>
            </nav>
    )
}

export default NavBar
