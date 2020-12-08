import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "../BiwoAdmin/TableContainer"
import { db,auth } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import ExpandBooking from '../BiwoAdmin/ExpandBooking'



function BookingsBuildingList() {

    const [bookingsBuild, setBookingsBuild] = useState([])

    var user = auth.currentUser;


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

        if(user)
        {
            db.collection("usuarios").doc(user.uid).get().then(function (doc) {

                db.collection("reservas").where("idEdificio", "==", doc.data().idEdificio)
                    .onSnapshot(function (querySnapshot) {
    
                        var bookingsBuilding = []
                        querySnapshot.forEach(function (doc) {
                            bookingsBuilding.push(doc.data())
                        });
                        setBookingsBuild(bookingsBuilding)
                    })
    
            })
        }

    }, [user]);


    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={bookingsBuild} renderRowSubComponent={renderRowSubComponent} />
        </Container>
    )
}

export default BookingsBuildingList
