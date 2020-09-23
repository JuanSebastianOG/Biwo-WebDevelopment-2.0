import React, { useState } from 'react'
import "../css/Booking.css"
import { db } from '../firebase';

function Booking() {

    const [date, setDate] = useState('')
    var nonvalidHours = [];

    const [startHours, setStartHours] = useState(["1. Ingrese Fecha"])
    const AddStartHours = startHours.map(Add => Add)

    const [endHours, setEndHours] = useState(["2. Ingrese hora inicio"])
    const AddFinHours = endHours.map(Add => Add)

    const submitRegister = e => {
    }

    const dateChangeHandler = e => {
        setDate(e.target.value);
        var bookingRef = db.collection("reservas");
        setStartHours(["1. Ingrese Fecha"])
        setEndHours(["2. Ingrese hora inicio"])
        //Takes all bookings on a specific dat ****NO FOR BUILD AND MODULE (NEED)****
        var query = bookingRef.where("fecha", "==", e.target.value).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    var startHours = doc.data().horaInicio;
                    var endH = doc.data().horaFin;
                    //For each booking registered, look for the non valid hours
                    //And push it on the nonvalidHours array
                    for (let i = 7; i < 22; i++) {
                        if (i >= startHours && i < endH) {
                            if (nonvalidHours.indexOf(i) === -1) {
                                nonvalidHours.push(i);
                                console.log(i);
                            }
                        }
                    }
                    console.log(nonvalidHours, 'nosepuede')
                    console.log(doc.id, " => ", doc.data());
                    /*Create the array and push all the valid hours 
                    (the ones that does'nt exist on nonvalidHours array)*/
                    let validHours = []
                    validHours.push("-")
                    for (let i = 7; i < 22; i++) {
                        if (nonvalidHours.indexOf(i) === -1) {
                            validHours.push(i)
                        }
                    }
                    setStartHours(validHours)

                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    const selectStartHourChangeHandler = e => {
        let validEndHours = []
        for (let i = startHours[e.target.value] + 1; i <= 22; i++) {
            validEndHours.push(i)
        }

        setEndHours(validEndHours)

        console.log(endHours);
    }

    return (

        <div className="bking">
            <div className="bking__container">
                <h1>Nueva Reserva</h1>

                <div className="bking__containerFlex">
                    <img className="bking_containerFlexImg" src="https://i.ibb.co/PG6R21D/Componente-1-1.png" alt="Componente-1-1" border="0" />
                    <form className="bking_containerFlexForm" action="">
                        <label htmlFor="">Fecha</label>
                        <input type="date" onChange={dateChangeHandler} />
                        <div className="bking_containerFlexFormHours">
                            <label htmlFor="">Hora Inicio</label>
                            <label>Hora Fin</label>
                        </div>
                        <div className="bking__containerTimes">

                            <select id="in_time_hr" name="out_time_hr" onChange={selectStartHourChangeHandler}>
                                {
                                    AddStartHours.map((hourStart, key) => <option value={key}>{hourStart}</option>)
                                }
                            </select>
                            <h1> - </h1>
                            <select value={endHours} className="bking__time" id="out_time_hr" name="out_time_hr">
                                {
                                    AddFinHours.map((hourFin, key) => <option value={key}>{hourFin}</option>)
                                }
                            </select>

                        </div>
                        <div className="bking__containerButton">

                            <label>Tarifa:</label>
                            <label> $ 12600</label>

                            <button type="button" className="bking__Button" onClick={submitRegister}>Reservar</button>
                        </div>
                    </form>
                    <div></div>
                </div>


            </div>

        </div>
    )
}

export default Booking
