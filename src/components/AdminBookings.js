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
    const history = useHistory();
    var tempBookings = [];

    useEffect(() => {

        if (currentUser) {
            db.collection('reservas').where("idUsuario", "==", currentUser.uid).get()
                .then(function (snap) {

                    snap.forEach(function (doc) {
                        console.log("Booking Details:", doc.data());
                        tempBookings.push(doc.data())
                    });
                    setUserBookings(tempBookings);
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
                userBookings.map((booking) => <BookingBox
                day={booking.fecha}
                month="Agosto"
                building="Edificio Reservas del Cedro"
                module="Modulo 23432434"
                hour="14:00 - 16:00"
            />)
            }

            <BookingBox
                day={24}
                month="Agosto"
                building="Edificio Reservas del Cedro"
                module="Modulo 1"
                hour="14:00 - 16:00"
            />


        </Admin>
    )
}

export default AdminBookings
