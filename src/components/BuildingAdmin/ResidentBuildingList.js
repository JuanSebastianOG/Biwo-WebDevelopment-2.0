import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "../BuildingAdmin/TableContainer"
import { db, auth } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
function ResidentBuildingList() {
    const [residentsBuild, setResidentsBuild] = useState([])

    var user = auth.currentUser;

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

        if(user)
        {
            db.collection("usuarios").doc(user.uid).get().then(function (doc) {

                db.collection("usuarios").where("idEdificio", "==", doc.data().idEdificio)
                    .onSnapshot(function (querySnapshot) {
    
                        var residentsBuilding = []
                        querySnapshot.forEach(function (doc) {
                            residentsBuilding.push(doc.data())
                        });
                        setResidentsBuild(residentsBuilding)
                    })
    
            })
        }
        
    }, [user])
    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer id='tables' columns={columns} data={residentsBuild} />
        </Container>
    )
}

export default ResidentBuildingList
