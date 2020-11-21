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
//importar table

function ReceiptList() {

    const [receipts, setReceipts] = useState([])

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
                Header: "Estado de Recibo",
                Cell: (cellProps) => {
                    const {
                        estado,
                    } = cellProps.row.original
                    if (estado == "No Pago")
                        return <div>
                            {estado}
                            <StyledTitleRed></StyledTitleRed>
                        </div>
                    else if (estado == "En Revisión")
                        return <div>
                            {estado}
                            <StyledTitleYellow></StyledTitleYellow>
                        </div>
                    else if (estado == "Pagado")
                        return <div>{estado}
                            <StyledTitleGreen></StyledTitleGreen>
                        </div>
                }
            },
            {
                Header: "Evidencia Documento",
                Cell: () => (
                    <span >
                        <button type="button" className="btn btn-success btn-sm btn-block"  > Descargar</button>
                    </span>
                )


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
