import React, { useState } from 'react'
import { useEffect } from 'react';
import "../css/Booking.css"
import { auth, db } from '../firebase';



function Booking() {



    const [date, setDate] = useState('');
    var nonvalidHours = [];
    const [modules, setModules] = useState(['Cargando... (Ingrese Fecha)'])
    const AddModules = modules.map(Add => Add)
    const [buildingModules, setBuildingModules] = useState([])
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [startHours, setStartHours] = useState(["2. Ingrese fecha"])
    const AddStartHours = startHours.map(Add => Add)
    const [endHours, setEndHours] = useState(["2. Ingrese hora inicio"])
    const AddFinHours = endHours.map(Add => Add)
    var usersi = auth.currentUser;
    const [userID, setUserID] = useState(["2. Ingrese hora inicio"])
    const [edificioID, setEdificioID] = useState(["2. Ingrese hora inicio"])
    const [bookingsModuleBuilding, setBookingsModuleBuilding] = useState([])
    const [buildingModuleCost, setBuildingModuleCost] = useState("")
    const [buildingName, setBuildingName] = useState("")
    const [userName, setUserName] = useState("")
    const [buildingStartHour, setBuildingStartHour] = useState("")
    const [buildingEndHour, setBuildingEndHour] = useState("")
    const [buildingState, setBuildingState] = useState(true)
    const [userState, setUserState] = useState(true)

    const [bookingCost, setBookingCost] = useState(" - ")
    const [cantHours, setCantHours] = useState("-")

    var d = new Date();
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    const dati = year + "-" + month + "-" + day
    d.setMonth(d.getMonth() + 2);

    var dayend = d.getDate()
    var monthend = d.getMonth() + 1
    var yearend = d.getFullYear()
    if (dayend < 10) {
        dayend = '0' + dayend
    }
    if (monthend < 10) {
        monthend = '0' + monthend
    }
    const datiend = yearend + "-" + monthend + "-" + dayend

    useEffect(() => {
        if (usersi) {
            // User is signed in.
            setUserID(usersi.uid)
            db.collection("usuarios").doc(usersi.uid)
                .onSnapshot(function (doc) {
                    if (doc.exists) {
                        setEdificioID(doc.data().idEdificio)
                        setUserName(doc.data().name + " " + doc.data().lastname)
                        setUserState(doc.data().estado)
                        db.collection('edificios').doc(doc.data().idEdificio).onSnapshot(function (doc) {
                            if (doc.exists) {
                                db.collection('reservas').where("idEdificio", "==", doc.id)
                                    .onSnapshot(function (querySnapshot) {
                                        var bookings = []
                                        querySnapshot.forEach(function (doc) {
                                            bookings.push(doc.data())
                                        });
                                        setBookingsModuleBuilding(bookings)
                                    })
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
                                setBuildingState(doc.data().estado)



                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        })


                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
        } else {
            // No user is signed in.

        }



    }, [usersi]);

    const submitBooking = e => {
        if (window.confirm("¿Esta seguro que quiere realizar esta reserva? Costo: "+bookingCost+' pesos Tiempo: '+cantHours+' horas')) {

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
            var year = date.substring(0, 4);

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
                nombreUsuario: userName,
                dia: day,
                mes: monthNames[month - 1],
                año: year,
                nombreEdificio: buildingName,
                nombreModulo: strselectedModule,
                horaInicioFin: hourStartEnd,
                reseña:false,
            }).then(function (docRef) {
                db.collection("reservas")
                .doc(docRef.id)
                .update({
                    idReserva: docRef.id
                });
                alert("Su reserva ha sido existosa")
                window.location.reload();
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
        }
    }

    function calculateStartHours() {
        setAllowSubmit(false)
        setBookingCost(" - ")
        let element = document.getElementById("in_time_hr");
        element.value = 0;
        setStartHours(["-"])
        setEndHours(["2. Ingrese hora inicio"])
        //Takes all bookings on a specific date
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
        //if there aren't bookings on the day (all hours are valid)
        if (!bookingsOnDay) {
            let validHours = []
            validHours.push("-")

            for (let i = firstHour; i < buildingEndHour; i++) {
                validHours.push(i)
            }
            setDate(selectedDate)
            setStartHours(validHours)
        }
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
    if (usersi) {
        if (buildingState) {
            if (userState) {
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
                                            AddModules.map((module, key) => <option value={key} key={module}>{module}</option>)
                                        }
                                    </select>
                                    <div className="bking_containerFlexFormHours">
                                        <label htmlFor="">Hora Inicio</label>
                                        <label>Hora Fin</label>
                                    </div>
                                    <div className="bking__containerTimes">

                                        <select id="in_time_hr" name="in_time_hr" onChange={selectStartHourChangeHandler}>
                                            {
                                                AddStartHours.map((hourStart, key) => <option value={key} key={hourStart}>{hourStart}</option>)
                                            }
                                        </select>
                                        <h1> - </h1>
                                        <select className="bking__time" id="out_time_hr" name="out_time_hr" onChange={selectEndHourChangeHandler}>
                                            {
                                                AddFinHours.map((hourFin, key) => <option value={key} key={hourFin}>{hourFin}</option>)
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
            } else {
                return (
                    <div className="bking__blocked">
                        <h5>No se pueden realizar reservas, la cuenta ha sido bloqueada. Comuniquese con el administrador del edificio </h5>
                    </div>
                )

            }

        } else {
            return (
                <div className="bking__blocked">
                    <h5>No se pueden realizar reservas, el edificio esta bloqueado por un administrador </h5>
                </div>
            )

        }
    } else {
        return (
            <div className="aver">
                <h1>Cargando ... Iniciar sesion</h1>
            </div>
        )

    }



}

export default Booking
