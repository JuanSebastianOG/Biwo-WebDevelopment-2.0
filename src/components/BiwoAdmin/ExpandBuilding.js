import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "reactstrap"
import { db } from '../../firebase.js'
import styled from 'styled-components';
const SelectH2 = styled.h4`
    {
        color: #002980;
        margin: 2rem;        
    }`

const ErrorH6 = styled.h4`
    {
        text-align: center;
        color: #d9534f;     
    }`


function ExpandBuilding({ row }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [showBlock, setShowBlock] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [modules, setModules] = useState([])
    const [selectedModule, setSelectedModule] = useState(0)
    const [bookingsOnBlockday] = useState(false)
    const AddModules = modules.map(Add => Add)
    const [bookingsModuleBuilding, setBookingsModuleBuilding] = useState([])


    useEffect(() => {
        var mod = []

        for (let i = 0; i < row.original.numModulos; i++) {
            mod.push("Módulo " + (1 + i))
        }
        setModules(mod)

        db.collection('edificios').where("direccion", "==", row.original.direccion)
            .onSnapshot(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    db.collection('reservas').where("idEdificio", "==", doc.id)
                        .onSnapshot(function (querySnapshot) {
                            var bookings = []
                            querySnapshot.forEach(function (doc) {
                                bookings.push(doc.data())
                            });
                            setBookingsModuleBuilding(bookings)
                        })
                });
            })



    }, [row.original.numModulos, row.original.direccion])


    const submitBlockDays = (row) => {
        //Code for block days
        const {
            direccion
        } = row.original
        if (window.confirm("¿Esta seguro que desea bloquear estos días?")) {

            // To calculate the time difference of two dates 
            var Difference_In_Time = endDate.getTime() - startDate.getTime();

            // To calculate the no. of days between two dates 
            var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)) + 1;

            db.collection('edificios').where("direccion", "==", direccion)
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        const startBuildHour = doc.data().horaInicio
                        const endBuildHour = doc.data().horaFin
                        const idBuilding = doc.id
                        //Make block on bookings day by day
                        for (let i = 0; i < Difference_In_Days; i++) {
                            var date = startDate;
                            if (i !== 0)
                                date.setDate(date.getDate() + 1)
                            var day = date.getDate()
                            var month = date.getMonth() + 1
                            var year = date.getFullYear()
                            if (day < 10) {
                                day = '0' + day
                            }
                            if (month < 10) {
                                month = '0' + month
                            }
                            const dateInFormat = year + "-" + month + "-" + day

                            if (!bookingsOnBlockday) {
                                db.collection("reservas").add({
                                    estado: 'Bloqueo Administrador Biwo',
                                    fecha: dateInFormat,
                                    horaFin: endBuildHour,
                                    horaInicio: startBuildHour,
                                    idEdificio: idBuilding,
                                    idModulo: row.original.idModulos[selectedModule]
                                }).then(function (docRef) {
                                    console.log("Su bloqueo ha sido existoso")
                                }).catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });
                            }

                        }
                        if (!bookingsOnBlockday)
                            window.location.reload();

                    });
                })
        }
    }
    const submitCreateModule = (row) => {
        //Code for block days
        const {
            idEdificio,
            idModulos
        } = row.original
        if (window.confirm("¿Esta seguro que desea crear un nuevo módulo para este edificio?")) {

            db.collection("modulos").add({
                idEdificio: idEdificio,
                nombreModulo: "Módulo " + (idModulos.length + 1),
            }).then(function (docRefM) {
                console.log("Se ha añadido el modulo")
                idModulos.push(docRefM.id)
                var buildingRef = db.collection("edificios").doc(idEdificio);
                buildingRef.update({
                    idModulos,
                    numModulos: idModulos.length,
                })
                    .then(function () {
                        console.log("Document successfully updated!");
                        alert('Modulo añadido satisfactoriamente')
                        window.location.reload();

                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
        }

    }

    const selectModuleChange = e => {
        setSelectedModule(e.target.value)
        setStartDate(new Date());
        setEndDate(null);
        setShowBlock(false)
        setShowMessage(false);
    }
    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start != null && end != null) {
            setShowBlock(true)
            setShowMessage(false)
            // To calculate the time difference of two dates 
            var Difference_In_Time = end.getTime() - start.getTime();

            // To calculate the no. of days between two dates 
            var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)) + 1;
            var date = new Date(start.getTime());

            for (let i = 0; i < Difference_In_Days; i++) {

                if (i !== 0)
                    date.setDate(date.getDate() + 1)

                var day = date.getDate()
                var month = date.getMonth() + 1
                var year = date.getFullYear()
                if (day < 10) {
                    day = '0' + day
                }
                if (month < 10) {
                    month = '0' + month
                }
                const dateInFormat = year + "-" + month + "-" + day
                console.log("aver qeu hay", bookingsModuleBuilding)
                console.log("date in format", dateInFormat)

                bookingsModuleBuilding.forEach(function (doc) {
                    // if there is at least one booking on the specific module on the day it doesnt allow block button
                    //and show Error message
                    console.log(doc.fecha, dateInFormat, doc.idModulo, row.original.idModulos[selectedModule])

                    if (doc.fecha === dateInFormat && doc.idModulo === row.original.idModulos[selectedModule]) {
                        console.log("tengo  este día paila")
                        setShowBlock(false)
                        setShowMessage(true)
                    }
                });

            }

        }
        else
            setShowBlock(false)

    };

    return (


        <Container style={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            <SelectH2>1.Crear Módulo</SelectH2>
            <button onClick={() => submitCreateModule(row)} type="button" className="btn btn-success btn-sm" >Crear modulo</button>
            <SelectH2>2.1 Seleccione módulo a bloquear</SelectH2>
            <select className="bking__modules" onChange={selectModuleChange} id="bking__selectedModule">
                {
                    AddModules.map((modules, key) => <option value={key} key={modules}>{modules}</option>)
                }
            </select>

            <Container style={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                <SelectH2 >2.2. Seleccione días a bloquear</SelectH2>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    selectsRange
                    inline
                />

                <Container style={{ height: '2rem' }}></Container>
                {showMessage &&
                    <ErrorH6>No se puede bloquear, hay reserva en uno de los días escogidos </ErrorH6>
                }
                {showBlock &&
                    <button onClick={() => submitBlockDays(row, document.getElementById("bking__selectedModule").value)} type="button" className="btn btn-danger btn-sm" >Bloquear</button>
                }
            </Container>

        </Container>
    )
}

export default ExpandBuilding
