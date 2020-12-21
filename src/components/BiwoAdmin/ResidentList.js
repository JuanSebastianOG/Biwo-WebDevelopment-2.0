import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "../BuildingAdmin/TableContainer"
import { db } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
function ResidentList() {
    const [residents, setResidents] = useState([])
    const submitBooking = (cellProps) => {
        const {
            email,
            date,
        } = cellProps.row.original
        console.log(email, date)
        //Cote for block user
    }

    const columns = useMemo(
        () => [
            {
                Header: "Primer Nombre",
                accessor: "name",
            },
            {
                Header: "Segundo Nombre",
                accessor: "lastname",
            },
            {
                Header: "Correo",
                accessor: "email",
            },
            {
                Header: "Celular",
                accessor: "phonenumber",
                disableSortBy: true
            },
            {
                Header: 'Bloquear',
                // Cell has access to row values. If you are curious what is inside cellProps, you can  console log it
                Cell: (cellProps) => {
                    return <button onClick={() => submitBooking(cellProps)} type="button" className="btn btn-danger btn-sm btn-block" >Bloquear</button>
                }
            },
        ],
        []
    )

    useEffect(() => {
        db.collection('usuarios')
            .onSnapshot(function (querySnapshot) {
                var residents = []
                var adminMail = "biwodev@gmail.com";

                querySnapshot.forEach(function (doc) {
                    console.log(doc.data().email)
                    if (!(adminMail===doc.data().email))
                        residents.push(doc.data())
                });
                setResidents(residents)
            })
    }, [])
    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer id='tables' columns={columns} data={residents} />
        </Container>
    )
}

export default ResidentList
