import React, { useEffect } from 'react';
import { Container } from "reactstrap"
import styled from 'styled-components';
import { db } from '../../firebase.js'
import { useState } from 'react'
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

const ExpandBooking = ({ row }) => {

    const [feedback, setFeedback] = useState('')
    const [ratingService, setRatingService] = useState(0)
    const [ratingInternet, setRatingInternet] = useState(0)
    const [ratingNeatness, setRatingNeatness] = useState(0)

    useEffect(() => {

         db.collection('reseñas').where("idBooking", "==", row.original.idReserva)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        setFeedback(doc.data().mensaje);
                        setRatingService(doc.data().ratingServicio)
                        setRatingInternet(doc.data().ratingInternet)
                        setRatingNeatness(doc.data().ratingLimpieza)
                    })
                })
    }, [])

    return (
        <div>
            <StyledContainer >
                <StyledTitle >Satisfacción General Del Servicio</StyledTitle>
                <StyledTitle  >{ratingService}</StyledTitle>
                
                <StyledTitle >Servicio de Internet</StyledTitle>
                <StyledTitle  >{ratingInternet}</StyledTitle>
                <StyledTitle >Limpieza del Módulo</StyledTitle>
                <StyledTitle  >{ratingNeatness}</StyledTitle>
                <StyledTitle >Comentarios Adicionales</StyledTitle>
                <StyledText>{feedback}</StyledText>

            </StyledContainer>
        </div>
    );
}

export default ExpandBooking;
