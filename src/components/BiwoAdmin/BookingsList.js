import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "./TableContainer"
import { db } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import ExpandBooking from './ExpandBooking'



function BookingsList() {

    const [bookings, setBookings] = useState([])


    const renderRowSubComponent = row => {
        return (
            <ExpandBooking row={row} ></ExpandBooking>
        )
    }

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


                id: 'expander', // 'id' is required
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        <button  type="button" className="btn btn-success btn-sm btn-block"  > Ver</button>
                    </span>
                )


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
                setBookings(bookings);
            })

    }, []);


    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={bookings} renderRowSubComponent={renderRowSubComponent} />
        </Container>
    )
}

export default BookingsList
