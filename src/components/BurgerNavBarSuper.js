import React    from 'react'
import {  auth } from '../firebase';
import styled from 'styled-components'; 

import { Link } from 'react-router-dom';


const BurgerNavBar = styled.div`
  display : none;
  @media (max-width: 768px) {
    font-family: 'Helvetica Text';
    text-decoration: none;
    display:block;
    visibility: visible;
    list-style: none;
    flex-flow: column nowrap;
    background-color: #012063;
    position: fixed;
    transform: ${({ open}) => (open) ? 'translateX(10%)' : 'translateX(120%)'};
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
      font-size: 1em;
      
      
    }
    hr{
        background-color: #C5F8CE;
        margin-left:10px;
        margin-right:25px;
        opacity: 30%;
    }
    Link{ 
        color: #00FF00; 
        }

    img{
        opacity:60%;
    }

  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;


const RightNavBarSuper = ({ open , handle }) => {

const signOutUser = () =>{
    auth.signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        alert(error.message)
      });
    
}
    
    return (
        <BurgerNavBar open={open}  onClick={handle} >
            <StyledLink to="/adminRecibos" >
                <h1>Recibos</h1>
            </StyledLink>
            <hr />
            <StyledLink to="/adminReservas" >
                <h1>Reservas</h1>
            </StyledLink>
            <hr />
            <StyledLink to="/adminResidentes"  >
                <h1>Residentes</h1>
            </StyledLink>
            <hr />
            <StyledLink to="/adminEdificios"  >
                <h1>Edificios</h1>
            </StyledLink>
            <hr />
            <StyledLink to="/adminUsuarios"  >
                <h1>Usuarios</h1>
            </StyledLink>
            <hr />
            <StyledLink onClick = {signOutUser} to="/"  >
                <h1>Cerrar Sesión</h1>
            </StyledLink>

            <img src="https://i.ibb.co/2d8pLGZ/BIWO-ISOTIPO-VERDE.png" alt="Logo" border="0" />


        </BurgerNavBar>


    )
}

export default RightNavBarSuper
