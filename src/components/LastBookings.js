import React from 'react'
import "../css/LastBookings.css"
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Route,BrowserRouter } from 'react-router-dom';


const DropButton = styled.button`
    {
    
            font-family: 'Helvetica Text';
            font-size: 20px;
            border: 0px;
            background: #C5F8CE;
            outline:none;
            width:20%;
            height:100%;
            color:#002980;
            
            border-radius: 0  15px 15px 0;


        
        @media (max-width: 550px) {
  
            border-radius: 0  0 15px 0;
            width:50%;
            font-size: 12px;
            
        }

}`

function LastBookings({ active, day, month, building, module, hour, idBooking }) {
    let classNameDiv = "lastBookings";
    let classNameDate = "lastBookings__date";
    let classNameInfo = "lastBookings__info";

    if (active) {
        classNameDiv = "lastBookingsactive";
        classNameDate = "lastBookings__dateactive";
        classNameInfo = "lastBookings__infoactive"
    }
    return (
        <div className={classNameDiv}>
            <div className={classNameDate}>
                <h1>{day}</h1>
                <h4>{month}</h4>
            </div>
            <div className={classNameInfo}>
                <h4>{building}</h4>
                <h6>{module}</h6>
                <h5>{hour}</h5>
            </div>
            <DropButton>
            <Link  to ={{pathname: `/feedback/${idBooking}`}}>Reseña
               &#9734;</Link>
               
            </DropButton>
           
        </div>
    )
}

export default LastBookings
