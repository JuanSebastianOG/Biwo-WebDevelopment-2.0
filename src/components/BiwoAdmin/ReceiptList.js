import React from 'react';
import { useState, useMemo, useEffect } from 'react'
import TableContainer from "./TableContainer"
import { db } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import styled from 'styled-components';

const StyledTitleRed = styled.div`
    {
        background-color: #ff4d4d;
        margin: 1rem; 
        border-radius: 50%;   
        height: 15px;
         width: 15px;    
    }`
const StyledTitleYellow = styled.div`
    {
        background-color: #ffcc00;
        margin: 1rem; 
        border-radius: 50%;   
        height: 15px;
         width: 15px;        
    }`
const StyledTitleGreen = styled.div`
    {
        background-color: #33cc33;
        margin: 1rem; 
        border-radius: 50%;   
        height: 15px;
         width: 15px;       
    }`

const StyledContainer = styled(Container)`

{   align-items: center;
    display: flex;
    flex-direction: column;
    
   
}`

//importar table

function ReceiptList() {

    const [receipts, setReceipts] = useState([])

    const openUrl = (cellProps) => {
        console.log(cellProps.row.original)
        window.open(cellProps.row.original.storage);
    }

    const markPayed = (cellProps) => {
        db.collection('recibos')
            .doc(cellProps.row.original.idRecibo)
            .update({
                estado: "Pagado"
            }).then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
    //useSate de recibos

    //define columns
    const columns = useMemo(
        () => [
            {
                Header: "Edificio",
                accessor: "nombreEdificio",
            },
            {
                Header: "Administrador",
                accessor: "nombreAdmin",
            },
            {
                Header: "Mes",
                accessor: "mes",
            },
            {
                Header: "Año",
                accessor: "año",
            },
            {
                Header: "Estado de Pago",
                Cell: (cellProps) => {
                    const {
                        estado,
                    } = cellProps.row.original
                    if (estado === "No Pago")
                        return <div>
                            {estado}
                            <StyledTitleRed></StyledTitleRed>
                        </div>
                    else if (estado === "En Revision")
                        return <div>
                            {estado}
                            <StyledTitleYellow></StyledTitleYellow>
                        </div>
                    else if (estado === "Pagado")
                        return <div>{estado}
                            <StyledTitleGreen></StyledTitleGreen>
                        </div>
                }
            },

            {
                Header: 'Pago',
                // Cell has access to row values. If you are curious what is inside cellProps, you can  console log it
                Cell: (cellProps) => {

                    const {
                        storage,
                    } = cellProps.row.original

                    if (storage === "")
                        return <StyledContainer>
                            <button onClick={() => openUrl(cellProps)} type="button" class="btn btn-secondary btn-block btn-sm " disabled>Descargar Recibo</button>
                        <button onClick={() => markPayed(cellProps)} type="button" class="btn btn-secondary btn-primary btn-block btn-sm" disabled >Marcar como Pagado</button>

                        </StyledContainer>
                    else {
                        return   <StyledContainer>
                        <button onClick={() => openUrl(cellProps)} type="button" class="btn  btn-primary  btn-block btn-sm" >Descargar Recibo</button>
                        <button onClick={() => markPayed(cellProps)} type="button" class="btn btn-success btn-primary btn-block btn-sm" >Marcar como Pagado</button>
                   </StyledContainer>
                           
                       
                    }
                }
            },
           

        ],
[]
    )

//useEffect con hacer query 
useEffect(() => {

    db.collection('recibos')
        .onSnapshot(function (querySnapshot) {
            var receipts = []
            querySnapshot.forEach(function (doc) {

                var newReceipt = doc.data()
                newReceipt.idReceipt = doc.id
                receipts.push(newReceipt)
            });
            console.log(receipts);
            setReceipts(receipts);
        })

}, []);
return (
    <Container style={{ marginTop: 100 }}>
        <TableContainer columns={columns} data={receipts} />
    </Container>
);
}

export default ReceiptList;
