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
            numModulos,
        } = cellProps.row.original

        console.log(numModulos)
        //Cote for block building
    }
    

    const renderRowSubComponent = row => {
        return (
           <ExpandBuilding row={row}/>
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
                Header: 'Block',
                // Cell has access to row values. If you are curious what is inside cellProps, you can  console log it
                Cell: (cellProps) => {
                    return <button onClick={() => blockBuilding(cellProps)} type="button" className="btn btn-danger btn-sm btn-block" >Bloquear</button>
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
                    buildings.push(doc.data())
                });
                setBuildings(buildings)
            })


    }, [])
    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer id='tables' columns={columns} data={buildings} renderRowSubComponent={renderRowSubComponent}
            />
        </Container>
    )
}

export default BuildingsList
