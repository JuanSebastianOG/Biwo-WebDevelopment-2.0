import React, { useState } from 'react'
import { useEffect } from 'react';
import "../css/Booking.css"
import { auth, db } from '../firebase';
import { useStateValue } from "./StateProvider";

function Booking() {
    const [{ user }] = useStateValue();
    const [date, setDate] = useState('');
    var nonvalidHours = [];
    const [startHours, setStartHours] = useState(["1. Ingrese Fecha"])
    const AddStartHours = startHours.map(Add => Add)
    const [endHours, setEndHours] = useState(["2. Ingrese hora inicio"])
    const AddFinHours = endHours.map(Add => Add)
    var usersi = auth.currentUser;
    const [userID, setUserID] = useState(["2. Ingrese hora inicio"])
    const [edificioID, setEdificioID] = useState(["2. Ingrese hora inicio"])
    const [bookingsModuleBuilding, setBookingsModuleBuilding] = useState([])
    const [buildingModuleCost, setBuildingModuleCost] = useState("")
    const [bookingCost, setBookingCost] = useState("-")
    const [cantHours, setCantHours] = useState("-")

    useEffect(() => {

        if (usersi) {
            // User is signed in.
            console.log("Soooy", usersi.uid)
            setUserID(usersi.uid)
            var docRef = db.collection("usuarios").doc(usersi.uid);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    setEdificioID(doc.data().buildingCode)
                    console.log("Document data:", doc.data());
                    db.collection('edificios').doc(doc.data().buildingCode).get()
                        .then(function (doc) {
                            if (doc.exists) {
                                console.log("Document Building data:", doc.data());
                                setBuildingModuleCost(doc.data().tarifa)
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch(function (error) {
                            console.log("Error getting document:", error);
                        });


                    db.collection('reservas').where("idEdificio", "==", doc.data().buildingCode).get()
                        .then(function (querySnapshot) {
                            var bookings = []
                            querySnapshot.forEach(function (doc) {
                                console.log("Document data effect:", doc.data());
                                bookings.push(doc.data())
                            });
                            setBookingsModuleBuilding(bookings)

                        })
                        .catch(function (error) {
                            console.log("Error getting documents: ", error);
                        });


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
        let estado=true;
        let fecha=date;
        let horaFin=endHours[document.getElementById('out_time_hr').value]
        let horaInicio=startHours[document.getElementById('in_time_hr').value]
        let idEdificio=edificioID;
        let idUsuario= userID;
        let tiempoTotal=cantHours;
        console.log('finalizando la maravilla',estado,fecha,horaFin,horaInicio,idEdificio,idUsuario,tiempoTotal)

    }
    const dateChangeHandler = e => {
        console.log(userID, "SE LOGROOO", edificioID)
        console.log(bookingsModuleBuilding, "SE LOGROOOx2")

        var bookingRef = db.collection("reservas");
        setStartHours(["1. Ingrese Fecha"])
        setEndHours(["2. Ingrese hora inicio"])
        var date = e.target.value
        //Takes all bookings on a specific dat ****NO FOR BUILD AND MODULE (NEED)****
        bookingsModuleBuilding.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.fecha === e.target.value) {

                var startHours = doc.horaInicio;
                console.log("aca dentro", doc)
                var endH = doc.horaFin;
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
                setDate(e.target.value)
            }
        });
        /* var query = bookingRef.where("fecha", "==", e.target.value).where("idEdificio", "==", edificioID).get()
             .then(function (querySnapshot) {
                 querySnapshot.forEach(function (doc) {
                     // doc.data() is never undefined for query doc snapshots
                     var startHours = doc.data().horaInicio;
                     console.log("aca dentro", doc.data())
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
        /*let validHours = []
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
});*/
    }
    const selectStartHourChangeHandler = e => {
        let validEndHours = []
        setEndHours("2.Ingrese hora inicio")

        validEndHours.push("-")

        var j = e.target.value;
        for (let i = startHours[e.target.value] + 1; i <= 22; i++) {
            if (startHours[j] + 1 === i) {
                validEndHours.push(i)
            }
            j++;
        }
        setEndHours(validEndHours)
    }
    const selectEndHourChangeHandler = e => {
        let startHour = startHours[document.getElementById('in_time_hr').value]
        let endHour = endHours[e.target.value]
        console.log('start',startHour,'end',endHour)
        let cantHours= endHour-startHour;
        console.log('son tantas horas',cantHours)
        setBookingCost(cantHours*buildingModuleCost)
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
                        <input type="date" onChange={dateChangeHandler} />
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

                            <label>Tarifa:</label>
                            <label> <span>$</span>{bookingCost}</label>

                            <button type="button" className="bking__Button" onClick={submitBooking}>Reservar</button>
                        </div>
                    </form>
                    <div></div>
                </div>


            </div>

        </div>
    )
}

export default Booking
