import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "./TableContainer"
import { db } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

function BookingsList() {

    const [bookings, setBookings] = useState([])
    const [name, setName] = useState()

    const columns = useMemo(
        () => [
            {
                Header: "Edificio",
                accessor: "nombreEdificio",
            },
            {
                Header: "# Módulo",
                accessor: "nombreModulo",
            },
            {
                Header: "Residente",
                accessor: "nombreUsuario",
            },
            {
                Header: "Fecha",
                accessor: "horaInicioFin",
            },
            {
                Header: "Tarifa",
                accessor: "costoReserva",
            },
            {
                Header: "Reseña",

                Cell: () => {

                    return <button  type="button" className="btn btn-success btn-sm btn-block" > Reseña</button>}

            },
            
        ],
        []
    )

    useEffect(() => {

        db.collection('reservas')
            .onSnapshot(function (querySnapshot) {
                var bookings = []
                querySnapshot.forEach(function (doc) {

                    var newBooking = doc.data()
                    newBooking.idReserva = doc.id
                    bookings.push(newBooking)
                });
                console.log(bookings);
                setBookings(bookings);
            })

    }, []);


    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={bookings} />
        </Container>
    )
}

export default BookingsList
