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

    var tempBookings = [];
    var idBookings = [];

    useEffect(() => {

        if (currentUser) {
            db.collection('reservas').where("idUsuario", "==", currentUser.uid).get()
                .then(function (snap) {

                    snap.forEach(function (doc) {
                        console.log("Booking Details:", doc.data());
                        
                        tempBookings.push(doc.data());
                        idBookings.push(doc.id);
                        
                    });
                    setUserBookings(tempBookings);
                    setBookingId(idBookings);
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });

            console.log("All Bookings Details:", userBookings);

        }
        else {
            history.push("/reservar");

        }

    }, [currentUser]);






    return (
        <Admin>

            <h1> Administrar Reservas</h1>

            {
               
                userBookings.map((booking,index) =>

                 <BookingBox

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
