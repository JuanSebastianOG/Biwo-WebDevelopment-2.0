import React, { useEffect } from 'react';
import { Container } from "reactstrap"
import styled from 'styled-components';
import ReactStars from "react-rating-stars-component";
import "../css/Help.css"
import { db } from '../firebase';
import { useState } from 'react'
import NavBar from './NavBar';
import { Link, useHistory } from "react-router-dom";

import "../css/Help.css"

const StyledTitle = styled.h5`
    {
        color: #002980;
        margin: 1rem;   
        text-align:center;     
    }`
const StyledText = styled.h6`
    {
        
        color: black;
        margin: 0.1rem;        
    }`
const StyledContainer = styled(Container)
    `

{   align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}`

const StyledTitle1 = styled.h1`
    margin-top:40px;
    margin-left:80px;
    color: #002980;
    font-weight: 700;
    display: block;
    @media (max-width: 550px) {
            
        margin-top:0;
        margin-left:0;
        text-align: center;
    }
`;
const StyledTitle2 = styled.h5`
    text-align: center;
    font-weight: 700;
    margin:3rem;

`;
const StyledBtn = styled.button`
color: white;
background-color: #002980;
border:none;
padding: 0.8rem 1.2rem;
font-family: 'Helvetica Text';
font-size: small;
margin

`;


const Feedback = ({ match }) => {

    const history = useHistory();

    const [feedback, setFeedback] = useState('')
    const [ratingService, setRatingService] = useState('')
    const [ratingInternet, setRatingInternet] = useState('')
    const [ratingNeatness, setRatingNeatness] = useState('')
    const [feedbackId, setFeedbackId] = useState(null)
    const ratingChangedService = (newRating) => {
        setRatingService(newRating)
        console.log(newRating);
    };
    const ratingChangedInternet = (newRating) => {
        setRatingInternet(newRating)
        console.log(newRating);
    };
    const ratingChangedNeatness = (newRating) => {
        setRatingNeatness(newRating)
        console.log(newRating);
    };
    useEffect(() => {
        db.collection("reseñas").where("idBooking", "==", match.params.idBooking)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (docFeed) {
                    // doc.data() is never undefined for query doc snapshots
                    setFeedbackId(docFeed.id)
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }, [])
    const sendFeedback = (e) => {
        console.log(match.params.idBooking)
        e.preventDefault();
        var docRef = db.collection("reservas").doc(match.params.idBooking);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                db.collection("reseñas")
                    .add({
                        idBooking: match.params.idBooking,
                        ratingServicio: ratingService,
                        ratingInternet: ratingInternet,
                        ratingLimpieza: ratingNeatness,
                        mensaje: feedback
                    }).then(function (docRes) {
                        docRef.update({
                            "reseña": true,
                        })
                            .then(function () {
                                console.log("Document successfully updated!");
                                alert("Su reseña ha sido enviado exitosamente")
                                window.location.reload();
                            });
                        history.push("/misReservas");
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });


    }
    if (!feedbackId) {
        return (
            <div >
                <NavBar users active="misreservas"
                    usertype={"residente"}
                />
                <StyledTitle1 > Reseña de Reserva </StyledTitle1>
                <StyledContainer >
                    <StyledTitle> Satisfacción General Del Servicio </StyledTitle>
                    <ReactStars count={5}
                        onChange={ratingChangedService}
                        size={30}
                        activeColor="#ffd700" />
                    <StyledTitle > Servicio de Internet </StyledTitle>
                    <ReactStars count={5}
                        onChange={ratingChangedInternet}
                        size={30}
                        activeColor="#ffd700" />
                    <StyledTitle > Limpieza del Módulo </StyledTitle>
                    <ReactStars count={5}
                        onChange={ratingChangedNeatness}
                        size={30}
                        activeColor="#ffd700" />
                    <StyledTitle > Comentarios Adicionales </StyledTitle>

                    <form action="" className="help__containerFlexRight" >

                        <textarea value={feedback}
                            onChange={
                                (e) => setFeedback(e.target.value)}
                            rows="2"
                            cols="10" />
                        <button onClick={sendFeedback} > Enviar Reseña </button>

                    </form>
                </StyledContainer>

            </div>
        );
    } else {
        return (
            <div>
                <NavBar users active="misreservas"
                    usertype={"residente"}
                />

                <StyledContainer>
                    <StyledTitle2> Su reseña ya ha sido registrada</StyledTitle2>
                    <Link to={"/misreservas"}><StyledBtn> Volver a mis reservas </StyledBtn></Link>
                </StyledContainer>
            </div>
        )
    }
}

export default Feedback;