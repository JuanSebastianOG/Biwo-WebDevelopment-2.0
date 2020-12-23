import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "../BuildingAdmin/TableContainer"
import { db, auth } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
function ResidentBuildingList() {
    const [residentsBuild, setResidentsBuild] = useState([])

    var user = auth.currentUser;

    const blockUser = (cellProps) => {
        const {
            idUsuario,
        } = cellProps.row.original
        console.log(cellProps.row.original)
        //Code for block user
        var userRef = db.collection("usuarios").doc(idUsuario);

        return userRef.update({
            estado: false
        })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
    const unlockUser = (cellProps) => {
        const {
            idUsuario,
        } = cellProps.row.original

        //Code for block user
        var userRef = db.collection("usuarios").doc(idUsuario);

        return userRef.update({
            estado: true
        })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
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
                    const {
                        estado,
                    } = cellProps.row.original
                    if (estado)
                        return <button onClick={() => blockUser(cellProps)} type="button" className="btn btn-danger btn-sm btn-block" >Bloquear</button>
                    else
                        return <button onClick={() => unlockUser(cellProps)} type="button" className="btn btn-success btn-sm btn-block" >Desbloquear</button>
                }
            },
        ],
        []
    )

    useEffect(() => {

        if (user) {
            db.collection("usuarios").doc(user.uid).get().then(function (doc) {

                db.collection("usuarios").where("idEdificio", "==", doc.data().idEdificio)
                    .onSnapshot(function (querySnapshot) {
                        var residentsBuilding = []
                        querySnapshot.forEach(function (doc) {
                            if (!doc.data().esAdmin) {
                                var newdoc = doc.data()
                                newdoc.idUsuario = doc.id
                                residentsBuilding.push(newdoc)
                            }
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
