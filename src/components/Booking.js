import React, { useState } from 'react'
import { useEffect } from 'react';
import "../css/Booking.css"
import { auth, db } from '../firebase';


function Booking() {

    const [date, setDate] = useState('');
    var nonvalidHours = [];
    const [modules, setModules] = useState([])
    const AddModules = modules.map(Add => Add)
    const [buildingModules, setBuildingModules] = useState([])
    const [allowSubmit, setAllowSubmit] = useState(false);

    const [startHours, setStartHours] = useState(["1. Ingrese Fecha"])
    const AddStartHours = startHours.map(Add => Add)
    const [endHours, setEndHours] = useState(["2. Ingrese hora inicio"])
    const AddFinHours = endHours.map(Add => Add)
    var usersi = auth.currentUser;
    const [userID, setUserID] = useState(["2. Ingrese hora inicio"])
    const [edificioID, setEdificioID] = useState(["2. Ingrese hora inicio"])
    const [bookingsModuleBuilding, setBookingsModuleBuilding] = useState([])
    const [buildingModuleCost, setBuildingModuleCost] = useState("")
    const [buildingName, setBuildingName] = useState("")
    const [buildingStartHour, setBuildingStartHour] = useState("")
    const [buildingEndHour, setBuildingEndHour] = useState("")
    const [bookingCost, setBookingCost] = useState(" - ")
    const [cantHours, setCantHours] = useState("-")
    var d = new Date();
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const dati = year + "-" + month + "-" + day
    d.setMonth(d.getMonth() + 2);

    const dayend = d.getDate()
    const monthend = d.getMonth() + 1
    const yearend = d.getFullYear()
    const datiend = yearend + "-" + monthend + "-" + dayend
    useEffect(() => {
        if (usersi) {

            // User is signed in.
            setUserID(usersi.uid)
            var docRef = db.collection("usuarios").doc(usersi.uid);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    setEdificioID(doc.data().idEdificio)
                    console.log("Document data USUARIO:", doc.data().idEdificio);
                    db.collection('edificios').doc(doc.data().idEdificio).get()
                        .then(function (doc) {
                            if (doc.exists) {
                                console.log("Document Building data:", doc.data());
                                setBuildingModules(doc.data().idModulos)
                                var mod = []

                                for (let i = 0; i < doc.data().idModulos.length; i++) {
                                    mod.push("Módulo " + (1 + i))
                                }
                                setModules(mod)
                                setBuildingModuleCost(doc.data().tarifa)
                                setBuildingName(doc.data().nombre)
                                setBuildingStartHour(doc.data().horaInicio)
                                setBuildingEndHour(doc.data().horaFin)
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch(function (error) {
                            console.log("Error getting document:", error);
                        });
                    db.collection('reservas').where("idEdificio", "==", doc.data().idEdificio)
                        .onSnapshot(function (querySnapshot) {
                            var bookings = []
                            querySnapshot.forEach(function (doc) {
                                bookings.push(doc.data())
                            });
                            setBookingsModuleBuilding(bookings)
                        })

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        } else {
            // No user is signed in.
        }
    }, [usersi]);

    const submitBooking = e => {
        let estado = true;
        let horaFin = endHours[document.getElementById('out_time_hr').value]
        let horaInicio = startHours[document.getElementById('in_time_hr').value]
        let idEdificio = edificioID;
        let idUsuario = userID;
        let tiempoTotal = cantHours;

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        var day = parseInt(date.substring(8, 10));
        var month = parseInt(date.substring(5, 7));

        var hourStartEnd = horaInicio + ":00 - " + horaFin + ":00";
        var selectedModuleNumber = document.getElementById("bking__selectedModule");
        var strselectedModule = selectedModuleNumber.options[selectedModuleNumber.selectedIndex].text;
        db.collection("reservas").add({
            estado: estado,
            fecha: date,
            horaFin: horaFin,
            horaInicio: horaInicio,
            idEdificio: idEdificio,
            idModulo: buildingModules[selectedModuleNumber.value],
            idUsuario: idUsuario,
            tiempoTotal: tiempoTotal,
            costoReserva: bookingCost,
            dia: day,
            mes: monthNames[month - 1],

            nombreEdificio: buildingName,
            nombreModulo: strselectedModule,
            horaInicioFin: hourStartEnd,
        }).then(function (docRef) {
            alert("Su reserva ha sido existosa")
            window.location.reload();
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });

    }

    function calculateStartHours() {
        setAllowSubmit(false)

        setBookingCost(" - ")
        let element = document.getElementById("in_time_hr");
        element.value = 0;
        setStartHours(["1. Ingrese Fecha"])
        setEndHours(["2. Ingrese hora inicio"])
        //Takes all bookings on a specific dat ****NO FOR MODULE (NEED)****
        var bookingsOnDay = false;
        const selectedDate = document.getElementById("bking__date").value

        var firstHour;
        if (d.getHours() > buildingStartHour) {
            if (selectedDate.localeCompare(dati) === 0)
                firstHour = d.getHours() + 1
            else
                firstHour = buildingStartHour

        } else {
            firstHour = buildingStartHour
        }

        bookingsModuleBuilding.forEach(function (doc) {
            var moduleSelected = document.getElementById('bking__selectedModule').value;
            // Take only the ones that are on the specific day
            if (doc.fecha === selectedDate && doc.idModulo === buildingModules[moduleSelected]) {
                bookingsOnDay = true;
                var startHours = doc.horaInicio;
                var endH = doc.horaFin;
                //For each booking registered, look for the non valid hours
                //And push it on the nonvalidHours array
                for (let i = firstHour; i < buildingEndHour; i++) {
                    if (i >= startHours && i < endH) {
                        if (nonvalidHours.indexOf(i) === -1) {
                            nonvalidHours.push(i);
                        }
                    }
                }
                /*Create the array and push all the valid hours 
                (the ones that does'nt exist on nonvalidHours array)*/
                let validHours = []
                validHours.push("-")
                for (let i = firstHour; i < buildingEndHour; i++) {
                    if (nonvalidHours.indexOf(i) === -1) {
                        validHours.push(i)
                    }
                }
                setStartHours(validHours)
                setDate(selectedDate)
            }
        });
        if (!bookingsOnDay) {
            let validHours = []
            validHours.push("-")

            for (let i = firstHour; i < buildingEndHour; i++) {
                validHours.push(i)
            }
            setDate(selectedDate)

            setStartHours(validHours)
        }   // The function returns the product of p1 and p2
    }
    const dateChangeHandler = e => {
        calculateStartHours()
    }
    const selectModuleChange = e => {
        calculateStartHours()
    }
    const selectStartHourChangeHandler = e => {
        let validEndHours = []
        setBookingCost(" - ")
        validEndHours.push("-")
        var j = e.target.value;
        var start = 1 + parseInt(startHours[e.target.value])
        let element = document.getElementById("out_time_hr");
        element.value = 0;
        setAllowSubmit(false)

        for (let i = start; i <= buildingEndHour; i++) {
            if (1 + parseInt(startHours[j]) === i) {
                validEndHours.push(i)
            }
            j++;
        }
        setEndHours(validEndHours)
    }
    const selectEndHourChangeHandler = e => {
        let startHour = startHours[document.getElementById('in_time_hr').value]
        let endHour = endHours[e.target.value]
        let cantHours = endHour - startHour;
        setAllowSubmit(true)
        
        setBookingCost(cantHours * buildingModuleCost)
        setCantHours(cantHours)
    }
    return (

        <div className="bking">
            <div className="bking__container">
                <h1>Nueva Reserva</h1>

                <div className="bking__containerFlex">
                    <img className="bking_containerFlexImg" src="https://i.ibb.co/PG6R21D/Componente-1-1.png" alt="Componente-1-1" border="0" />
                    <form className="bking_containerFlexForm" action="">
                        <label htmlFor="">Fecha</label>
                        <input id="bking__date" type="date" min={dati} max={datiend} onChange={dateChangeHandler} />
                        <label htmlFor="">Módulo</label>
                        <select className="bking__modules" onChange={selectModuleChange} id="bking__selectedModule">
                            {
                                AddModules.map((module, key) => <option value={key}>{module}</option>)
                            }
                        </select>
                        <div className="bking_containerFlexFormHours">
                            <label htmlFor="">Hora Inicio</label>
                            <label>Hora Fin</label>
                        </div>
                        <div className="bking__containerTimes">

                            <select id="in_time_hr" name="in_time_hr" onChange={selectStartHourChangeHandler}>
                                {
                                    AddStartHours.map((hourStart, key) => <option value={key}>{hourStart}</option>)
                                }
                            </select>
                            <h1> - </h1>
                            <select className="bking__time" id="out_time_hr" name="out_time_hr" onChange={selectEndHourChangeHandler}>
                                {
                                    AddFinHours.map((hourFin, key) => <option value={key}>{hourFin}</option>)
                                }
                            </select>

                        </div>
                        <div className="bking__containerButton">

                            <label>Costo:</label>
                            <label> <span>$</span>{bookingCost}</label>

                            <button disabled={!allowSubmit} type="button" className="bking__Button" onClick={submitBooking}>Reservar</button>
                        </div>
                    </form>
                    <div></div>
                </div>


            </div>

        </div>
    )
}

export default Booking
