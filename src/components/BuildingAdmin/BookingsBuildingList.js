import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "../BiwoAdmin/TableContainer"
import { db,auth } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import ExpandBooking from '../BiwoAdmin/ExpandBooking'



function BookingsBuildingList() {

    const [bookingsBuild, setBookingsBuild] = useState([])
    const [buildingState, setBuildingState] = useState(true)

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
                accessor: "fecha",
            },

            {
                Header: "Hora",
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

                db.collection("edificios").doc(doc.data().idEdificio)
                    .onSnapshot(function (querySnapshot) {
                        setBuildingState(querySnapshot.data().estado)
                    })

                db.collection("reservas")
                .where("idEdificio", "==", doc.data().idEdificio)
                .where("estado", "!=", 'Bloqueo Administrador Biwo')
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

    if (buildingState)
    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={bookingsBuild} renderRowSubComponent={renderRowSubComponent} />
        </Container>
    )
   
    else
        return (
            <div className="bking__blocked">
                <h5>No se pueden revisar las reservas, el servicio esta bloqueado. Comuníquese con Biwo para mas informacion </h5>
            </div>
        )
}

export default BookingsBuildingList
