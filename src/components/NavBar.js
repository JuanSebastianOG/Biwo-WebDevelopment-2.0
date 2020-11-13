import React from 'react'
import "../css/NavBar.css"
//import "../img/biwo-logo.png"
import { Link } from 'react-router-dom';
import {useStateValue} from "./StateProvider";
import Burger from './Burger';
import { Avatar } from "@material-ui/core"
import UserNavLinks from './NavLinks/UserNavLinks';
import SuperAdminNavLinks from './NavLinks/SuperAdminNavLinks'
function NavBar({ color, users, active, usertype }) {

    
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
    else
    {
        return (

            <nav className='navbar-login'>
                <Link to="/">
                    <img
                        alt=""
                        className="navbar__logo"
                        src="https://i.ibb.co/wwNdLm1/biwo-logo.png">
                    </img>
                </Link>

                <div>
                {(usertype == 'residente') ? <UserNavLinks active={active}/>:(usertype == 'superadmin') ?<SuperAdminNavLinks  active={active}/>:''}
                </div>
               
                
                <Burger />


            </nav>



        )
    }
        
}





export default NavBar
