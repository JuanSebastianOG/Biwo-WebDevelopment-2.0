import React from 'react'
import styled from 'styled-components';
import BookingBox from './BookingBox';
import { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { auth, db } from '../firebase';

//Styled Components

const Admin = styled.div`
    {
        display: flex;
        flex-direction: column; 
        height: 60em;
        h1{
            margin-top:40px;
            margin-left:80px;
            color: #002980;
            font-weight: 700;
        }
        @media (max-width: 860px) {
           h1{
            margin-left:40px;
           } 
       
         }
    }`


function AdminBookings() {

    var currentUser = auth.currentUser;
    const [userBookings, setUserBookings] = useState([]);
    const [bookingId, setBookingId] = useState([]);
    const history = useHistory();

    

    useEffect(() => {
        if (currentUser) {
            db.collection('reservas').where("idUsuario", "==", currentUser.uid)
                .onSnapshot(function (querySnapshot) {
                    var tempBookings = [];
                     var idBookings = [];
                    querySnapshot.forEach(function (doc) {
                        tempBookings.push(doc.data());
                        idBookings.push(doc.id);
                    });
                    setUserBookings(tempBookings);
                    setBookingId(idBookings);
                })
        }
        else {
            history.push("/reservar");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);


    return (
        <Admin>

            <h1> Administrar Reservas</h1>

            {

                userBookings.map((booking, index) =>

                    <BookingBox
                        key={index}
                        day={booking.dia}
                        month={booking.mes}
                        building={booking.nombreEdificio}
                        module={booking.nombreModulo}
                        hour={booking.horaInicioFin}
                        id={bookingId[index]}

                    />)
            }

        </Admin>
    )
}

export default AdminBookings
