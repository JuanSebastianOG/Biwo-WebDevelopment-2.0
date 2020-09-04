import React from 'react'

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  display : none;
  @media (max-width: 768px) {
    display:block;
    visibility: visible;
    list-style: none;
    flex-flow: column nowrap;
    background-color: #012063;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(10%)' : 'translateX(120%)'};
    top: 50px;
    right: 0;
    height: 100vh;
    width: 200px;
    padding-top: 2rem;
    -webkit-box-shadow: -5px 5px 5px #666;
    transition: transform 0.3s ease-in-out;
    h1 {
      color: #fff;
      padding: 25px 10px;
      font-family: 'Neue Titles';
      
    }
    hr{
        background-color: #C5F8CE;
        margin-left:10px;
        margin-right:25px;
        opacity: 30%;
    }
    Link:hover { color: #00FF00; }

    img{
        opacity:60%;
    }

  }
`;

const RightNavBar = ({ open }) => {
    return (
        <Ul open={open}>
            <Link to="/reservar"   >
                <h1>Reservar</h1>
            </Link>
            <hr/>
            <Link to="/misreservas" >
                <h1>Mis Reservas</h1>
            </Link>
            <hr/>
            <Link to="/administar"  >
                <h1>Administrar</h1>
            </Link>
            <hr/>
            <Link to="/ayuda"  >
                <h1>Ayuda</h1>
            </Link>
            <hr/>
            <Link to="/"  >
                <h1>Cerrar Sesión</h1>
            </Link>

            <img  src="https://i.ibb.co/2d8pLGZ/BIWO-ISOTIPO-VERDE.png" alt="Logo" border="0" />


        </Ul>


    )
}

export default RightNavBar
