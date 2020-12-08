import React from 'react';
import { Container } from "reactstrap"
import styled from 'styled-components';
import ReactStars from "react-rating-stars-component";
const StyledTitle = styled.h5`
    {
        color: #002980;
        margin: 1rem;        
    }`
const StyledText = styled.h6`
    {
        color: black;
        margin: 0.1rem;        
    }`
const StyledContainer = styled(Container)`

{   align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}`

const ExpandBooking = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    return (
        <div>
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
                <StyledText>Excelente Servicio, buenísimo el internet. Pude nevagar a alta velocidad.</StyledText>

            </StyledContainer>
        </div>
    );
}

export default ExpandBooking;
