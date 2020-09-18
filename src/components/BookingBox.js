import React from 'react'

import styled from 'styled-components/macro';

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

const ResponsiveContainer = styled.div`
{
    display: flex;
    flex-direction: row; 
    
    @media (max-width: 860px) {
        flex-direction: column; 
       
         }

}`

const ResponsiveCont1 = styled.div`
{
    display: flex;
    flex-direction: row; 
    height:100%;
    
    @media (max-width: 550px) {
       
        flex-direction: column; 
    
    }
    
    
}`

const ResponsiveCont2 = styled.div`
{
    display:none;
   
    @media (max-width: 550px) {
        display:flex;
        justify-content: space-between;
        border-top: 1px solid  white;
        
       
    }
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
        @media (max-width: 860px) {
            
            padding: 10px;
            
         }
         @media (max-width: 460px) {
            
            padding: 10px;
            

            
         }
       
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
        span { display:inline-block; 
        line-height:1.2; }
        @media (max-width: 860px) {
            height:100%;
            padding: 10px;
            font-size: 18px;

         }
         @media (max-width: 550px) {
            border-right: 0px solid  white;
            border-radius: 0  15px 0 0;
            height:80%;
            padding: 6px;
            font-size: 18px;
            span { display:inline-block; line-height:1.2; }
         }
         @media (max-width: 330px) {
            font-size: 15px;
         }
       
        
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
        width:fit-content;
        h2{
            font-family: 'Helvetica Text';
            font-size: 25px;
            padding: 25px;
        }
        @media (max-width: 930px) {
            h2{
            font-family: 'Helvetica Text';
            font-size: 25px;
            padding: 5px;
        }
         }
        @media (max-width: 860px) {
            display:none;
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
        @media (max-width: 550px) {
  
        
            width:50%;
            font-size: 12px;
            
        
        }

    }`

const TimeResponsive = styled.div`{
    display: none;
    @media (max-width: 860px) {
            display:flex;
            margin-top: 6px;
            font-family: 'Helvetica Text';
            font-size: 12px;
            margin:0;
         }

}`

const DisplayButtons = styled.div`
{
    display:flex;
    flex-direction: row; 
    @media (max-width: 550px) {
        display:none;
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
        @media (max-width: 550px) {
  
            border-radius: 0  0 15px 0;
            width:50%;
            font-size: 12px;
            border-top: 1px;
        }

}
        
    }`


function BookingBox({ day, month, building, module, hour }) {
    return (
        <BookingContainer>
            <DateField>
                <span>{day}</span>
                <span month >{month}</span>
                <TimeResponsive>
                <span> {hour}</span>
                </TimeResponsive>
            </DateField>
            <ResponsiveContainer>
                <ResponsiveCont1>
                    <LocationField>
                        <span>{building}</span>
                        <span>{module}</span>
                    </LocationField>
                    <TimeField>
                        <span> {hour}</span>
                    </TimeField>
                    <ResponsiveCont2>
                        <EditButton>
                            <button>Editar</button>
                        </EditButton>
                        <DropButton>
                            <button>Liberar</button>
                        </DropButton>
                    </ResponsiveCont2>
                </ResponsiveCont1>

            </ResponsiveContainer>



            <DisplayButtons>
                <EditButton>
                    <button>Editar</button>
                </EditButton>

                <DropButton>
                    <button>Liberar</button>
                </DropButton>
            </DisplayButtons>





        </BookingContainer>
    )
}

export default BookingBox
