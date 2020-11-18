import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "reactstrap"
import { db } from '../../firebase.js'

function ExpandBuilding({ row }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [showBlock, setShowBlock] = useState(false);
    const [modules, setModules] = useState([])
    const [selectedModule, setSelectedModule] = useState(0)

    const AddModules = modules.map(Add => Add)

    useEffect(() => {
        var mod = []

        for (let i = 0; i < row.original.numModulos; i++) {
            mod.push("Módulo " + (1 + i))
        }
        console.log(row.original.idModulos[0])
        setModules(mod)

    }, [])


    const submitBlockDays = (row) => {
        //Code for block days

        const {
            numModulos,
            nombre,
            direccion
        } = row.original


        // To calculate the time difference of two dates 
        var Difference_In_Time = endDate.getTime() - startDate.getTime();

        // To calculate the no. of days between two dates 
        var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)) + 1;
        console.log('Son esta canitadad', Difference_In_Days, 'tengo de start', startDate.getDate())

        db.collection('edificios').where("direccion", "==", direccion)
            .onSnapshot(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log('estoy en el firebase', doc.id)
                    const startBuildHour = doc.data().horaInicio
                    const endBuildHour = doc.data().horaFin
                    const idBuilding = doc.id

                    for (let i = 0; i < Difference_In_Days; i++) {
                        var date = startDate;
                        if (i != 0)
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
                        console.log('para bloquear', doc.id, dateInFormat, row.original.idModulos[selectedModule], startBuildHour, endBuildHour)
                        db.collection("reservas").add({
                            estado: 'Bloqueo Adinistrador Biwo',
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
                });
            })
    }

    const selectModuleChange = e => {
        setSelectedModule(e.target.value)
        console.log('aver', e.target.value)
    }
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
    return (
        <Container style={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>

            <label htmlFor="">Módulo</label>
            <select className="block" onChange={selectModuleChange} id="bking__selectedModule">
                {
                    AddModules.map((modules, key) => <option value={key} key={modules}>{modules}</option>)
                }
            </select>
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
                {showBlock &&
                    <button onClick={() => submitBlockDays(row, document.getElementById("bking__selectedModule").value)} type="button" className="btn btn-danger btn-sm btn-block" >Bloquear</button>
                }
            </Container>

        </Container>
    )
}

export default ExpandBuilding
