import React, { useState } from 'react'
import BurgerNavBar from './BurgerNavBar';
import "../css/Burger.css"
import styled from 'styled-components';

const StyledBurger = styled.div`
  width: 2rem;
  background-color: #002980;
  height: 2rem;
  position: fixed;
  top: 8px;
  right: 20px;
  z-index: 20;
  display: none;
  margin-bottom:10px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    @media (max-width: 768px) {
    }
    width: 2rem;
    height: 0.25rem;
    background-color:#C5F8CE;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
   
  }
`;

function Burger() {

    const [open, setOpen] = useState(false)

    function handleClick () {
      setOpen(!open);
    }
    return (
        <>
            <StyledBurger open={open}  onClick={() => setOpen(!open)} >

                <div className="burger__Item" />
                <div className="burger__Item" />
                <div className="burger__Item" />

            </StyledBurger>
            <BurgerNavBar open={open} handle={handleClick}/>
        </>

    )
}

export default Burger
