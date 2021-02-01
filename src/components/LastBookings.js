import React from 'react'
import "../css/LastBookings.css"
import styled from 'styled-components/macro';
import { Link,Route,BrowserRouter } from 'react-router-dom';

const DropButton = styled.button`
    {
    
            font-family: 'Helvetica Text';
            font-size: 20px;
            border: 0;
            background: #C5F8CE;
           
            width:20%;
            height:100%;
            color:#002980;
            
            border-radius: 0  10px 10px 0;

}`
const DropButtonNone = styled.button`
    {
        display:none;
        
            font-family: 'Helvetica Text';
            font-size: 20px;
            border: 0;
            background: #C5F8CE;
           
            width:20%;
            height:100%;
            color:#002980;
            
            border-radius: 0  10px 10px 0;

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
            {
                !active?<DropButton>
                <Link className="reviewButton" to ={{pathname: `/feedback/${idBooking}`}}>Reseña
                   &#9734;</Link>
                <Link className="reviewButtonResponsive" to ={{pathname: `/feedback/${idBooking}`}}>
                   &#9734;</Link>
                </DropButton>:<DropButtonNone/>
            }
            
           
        </div>
    )
}

export default LastBookings
