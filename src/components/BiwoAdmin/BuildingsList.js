import React, { useState, useMemo, useEffect } from 'react'
import TableContainer from "./TableContainer"
import { db } from '../../firebase.js'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Booking from '../Booking'
import { Divider } from '@material-ui/core'

function BuildingsList() {

    const [buildings, setBuildings] = useState([])
    const submitBooking = (cellProps) => {
        const {
            email,
            date,
        } = cellProps.row.original
        console.log(email, date)
        //Cote for block user
    }
    const submitBlockDays = (row) => {
        const {
            nombre,
            direccion,
        } = row.original
        console.log(nombre, direccion)
        //Cote for block user
    }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [showBlock, setShowBlock] = useState(false);

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start !== null)
            if (end !== null) {
                console.log(start.getDate(), end.getDate())
                setShowBlock(true)
            }
        else
            setShowBlock(false)

    };
    const renderRowSubComponent = row => {

        return (
            <Container style={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                <h2>Seleccione días a bloquear</h2>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    selectsRange
                    inline
                />
                {showBlock&&
                    <button  onClick={() => submitBlockDays(row)} type="button" className="btn btn-danger btn-sm btn-block" >Bloquear</button>
                }
            </Container>

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
                disableSortBy: true
            },
            {
                Header: 'Block',
                // Cell has access to row values. If you are curious what is inside cellProps, you can  console log it
                Cell: (cellProps) => {
                    return <button onClick={() => submitBooking(cellProps)} type="button" className="btn btn-danger btn-sm btn-block" >Bloquear</button>
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
