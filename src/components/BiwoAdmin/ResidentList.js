import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "../BuildingAdmin/TableContainer"
import { db } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
function ResidentList() {
    const [residents, setResidents] = useState([])

    const blockUser = (cellProps) => {

        const {
            idUsuario,
        } = cellProps.row.original


        if (window.confirm("Esta seguro que quiere bloquear al usuario?")) {
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

    }
    const unlockUser = (cellProps) => {
        const {
            idUsuario,
        } = cellProps.row.original

        if (window.confirm("Esta seguro que quiere desbloquear al usuario?")) {

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
        db.collection('usuarios')
            .onSnapshot(function (querySnapshot) {
                var residents = []
                var adminMail = "biwodev@gmail.com";

                querySnapshot.forEach(function (doc) {
                    console.log(doc.data().email)
                    if (!(adminMail === doc.data().email)) {
                        var newdoc = doc.data()
                        newdoc.idUsuario = doc.id
                        residents.push(newdoc)
                    }
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
