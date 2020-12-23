import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "./TableContainer"
import { db } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import ExpandBuilding from './ExpandBuilding'

function BuildingsList() {

    const [buildings, setBuildings] = useState([])
    const blockBuilding = (cellProps) => {
        const {
            idEdificio,
        } = cellProps.row.original

        //Code for block building
        var buildingRef = db.collection("edificios").doc(idEdificio);

        // Set the "esto" field of the city 'false'
        return buildingRef.update({
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
    const unlockBuilding = (cellProps) => {
        const {
            idEdificio,
        } = cellProps.row.original

        //Code for block building
        var buildingRef = db.collection("edificios").doc(idEdificio);

        // Set the "esto" field of the city 'false'
        return buildingRef.update({
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


    const renderRowSubComponent = row => {
        return (
            <ExpandBuilding row={row} />
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander', // 'id' is required
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? '➖' : '➕'}
                    </span>
                )
            },
            {
                Header: "Nombre",
                accessor: "nombre",
            },
            {
                Header: "Direccion",
                accessor: "direccion",
            },
            {
                Header: "Numero Modulos",
                accessor: "numModulos",
            },
            {
                Header: "Tarifa",
                accessor: "tarifa",
            },
            {
                Header: 'Bloquear / Desbloquear Edificio',
                // Cell has access to row values. If you are curious what is inside cellProps, you can  console log it
                Cell: (cellProps) => {
                    const {
                        estado,
                    } = cellProps.row.original
                    if (estado)
                        return <button onClick={() => blockBuilding(cellProps)} type="button" className="btn btn-danger btn-sm btn-block" >Bloquear</button>
                    else    
                        return <button onClick={() => unlockBuilding(cellProps)} type="button" className="btn btn-success btn-sm btn-block" >Desbloquear</button>
                }
            },
        ],
        []
    )

    useEffect(() => {
        db.collection('edificios')
            .onSnapshot(function (querySnapshot) {
                var buildings = []
                querySnapshot.forEach(function (doc) {
                    var newdoc = doc.data()
                    newdoc.idEdificio = doc.id
                    buildings.push(newdoc)
                });
                setBuildings(buildings)
            })


    }, [])
    return (
        <Container style={{ marginTop: 40 }}>
            <TableContainer id='tables' columns={columns} data={buildings} renderRowSubComponent={renderRowSubComponent}
            />
        </Container>
    )
}

export default BuildingsList
