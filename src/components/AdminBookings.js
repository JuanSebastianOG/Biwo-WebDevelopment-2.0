import React from 'react'
import styled from 'styled-components';
import BookingBox from './BookingBox';

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
    return (
        <Admin>

            <h1> Administrar Reservas</h1>

            <BookingBox
                day={24}
                month="Agosto"
                building="Edificio Reservas del Cedro"
                module="Modulo 1"
                hour="14:00 - 16:00" />
            <BookingBox
                day={24}
                month="Agosto"
                building="Edificio Reservas del Cedro"
                module="Modulo 1"
                hour="14:00 - 16:00"
            />
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
