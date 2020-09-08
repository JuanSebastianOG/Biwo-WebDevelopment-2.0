import React from 'react'
import styled from 'styled-components';

const BookingContainer = styled.div`
    {
        display: flex;
        flex-direction: row; 
        margin-top:40px;
        margin-left:auto;
        margin-right:auto;
        width: fit-content;
        border-radius: 15px 0 0 15px;
        height: 7em;

    }`

const DateField = styled.div`
    {
        background-color: #002980;
        color:white;
        display: flex;
        flex-direction: column; 
        padding: 25px;
        justify-content: space-evenly;
        align-items: center;
        font-family: 'Neue Titles';
        font-size: 20px;
        border-radius: 15px 0 0 15px;
        border-right: 2px solid  white;
       
    }`

const LocationField = styled.div`
    {
        display: flex;
        flex-direction: column; 
        padding: 25px;
        justify-content: space-evenly;
        align-items: left;
        font-family: 'Helvetica Text';
        font-size: 18px;
        background-color: #002980;
        color:white;
        border-right: 2px solid  white;
    }`
const TimeField = styled.div`
    {
        display: flex;
        flex-direction: row; 
        padding: 25px;
        justify-content: space-evenly;
        align-items:center;
        background-color: #002980;
        color:white;
        h2{
            font-family: 'Helvetica Text';
            font-size: 25px;
            padding: 25px;
        }
      
      
        
    }`

const EditButton = styled.div`
    {
        display: flex;
        flex-direction: column; 
        
        justify-content: space-evenly;
        align-items: center;
        width:6em;
        height:100%;
        border: none;
        background: none;
        button{
            font-family: 'Helvetica Text';
            font-size: 20px;
            border: 0px;
            background: #C5F8CE;
            outline:none;
            width:100%;
            height: 100%;
        }
    }`

const DropButton = styled.div`
    {
        display: flex;
        flex-direction: column; 
        
        justify-content: space-evenly;
        align-items: center;
        width:6em;
        height:100%;
        background-color: #002980;
        color:white;
        border-radius: 0  15px 15px 0;

        button{
            font-family: 'Helvetica Text';
            font-size: 20px;
            border: 0px;
            background: none;
            outline:none;
            width:100%;
            height: 100%;
            color:white;


        }
        
    }`

function BookingBox() {
    return (
        <BookingContainer>
            <DateField>

                <span>24</span>
                <span month >Agosto</span>

            </DateField>

            <LocationField>

                <span>Edificio Reserva del Cedro</span>
                <span>Módulo 3</span>

            </LocationField>

            <TimeField>

                <h2>10:20</h2>
                <h2> - </h2>
                <h2>11:20</h2>


            </TimeField>

            <EditButton>

                <button>Edit</button>

            </EditButton>

            <DropButton>
                <button>Liberar</button>
            </DropButton>

        </BookingContainer>
    )
}

export default BookingBox
