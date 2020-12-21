import React from 'react';
import { Container } from "reactstrap"
import styled from 'styled-components';
import ReactStars from "react-rating-stars-component";
import "../css/Help.css"
import { useState } from 'react'

import "../css/Help.css"

const StyledTitle = styled.h5`
    {
        color: #002980;
        margin: 1rem;        
    }`

const StyledContainer = styled(Container)`

{   align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}`

const StyledTitle1= styled.h1`
 margin-top:40px;
    margin-left:80px;
    color: #002980;
    font-weight: 700;
    display: block;
`;


const Feedback = () => {

    const [comment, setComment] = useState('')
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const sendMessage = (e) => {
        e.preventDefault();
     
        
    }

    return (
        <div>
            <StyledTitle1>Reseña de Reserva</StyledTitle1>
            <StyledContainer >
                
                <StyledTitle >Satisfacción General Del Servicio</StyledTitle>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={30}
                    activeColor="#ffd700"
                />
                <StyledTitle >Servicio de Internet</StyledTitle>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={30}
                    activeColor="#ffd700"
                />
                <StyledTitle >Limpieza del Módulo</StyledTitle>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={30}
                    activeColor="#ffd700"
                />
                                <StyledTitle >Comentarios Adicionales</StyledTitle>

                <form action="" className="help__containerFlexRight">

                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="2" cols="10" />
                    <button onClick={sendMessage}>Enviar Reseña</button>
                    
                </form>
            </StyledContainer>

        </div>
    );
}

export default Feedback;
