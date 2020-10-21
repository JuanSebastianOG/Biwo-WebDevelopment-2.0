import React, { useEffect, useState } from 'react'
import "../css/MyBookings.css"
import LastBookings from './LastBookings'
import { auth, db } from '../firebase';
import Booking from './Booking';

function MyBookings() {

    const [mybookings, setMyBookings] = useState([]);
    const [totalTime, setTotalTime] = useState([]);
    const [totalCost, setTotalCost] = useState([]);

    var usersi = auth.currentUser;
    useEffect(() => {
        if (usersi) {
            // User is signed in.
            console.log("Soooy", usersi.uid)


            db.collection('reservas').where("idUsuario", "==", usersi.uid)
                .onSnapshot(function (querySnapshot) {
                    var myBookings = [];
                    var totalTime=0;
                    var totalCost=0;
                    querySnapshot.forEach(function (doc) {
                        myBookings.push(doc.data());
                        totalTime=totalTime+doc.data().tiempoTotal;
                        totalCost=totalCost+doc.data().costoReserva;
                    });
                    setMyBookings(myBookings.reverse());
                    setTotalTime(totalTime)
                    setTotalCost(totalCost)
                });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }, [usersi]);

    return (
        <div className="mybookings">
            <h1>Tu reporte de Reservas</h1>
            <div className="mybookings__middle">
                <div className="mybookings__middleCont">
                    <h4>Reservas previas</h4>
                    <div className="mybookings__middleContBookings">
                        {
                            mybookings.map(booking =>
                                (<LastBookings
                                    active={booking.estado}
                                    day={booking.dia}
                                    month={booking.mes}
                                    building={booking.nombreEdificio}
                                    module={booking.nombreModulo}
                                    hour={booking.horaInicioFin}
                                />))
                        }
                        {/*<LastBookings
                            active={true}
                            day={24}
                            month="Agosto"
                            building="Edificio Reservas del Cedro"
                            module="Modulo 1"
                            hour="14:00 - 16:00" />
                        <LastBookings
                            active={false}
                            day={15}
                            month="Agosto"
                            building="Edificio Reservas del Cedro"
                            module="Modulo 1"
                            hour="14:00 - 16:00" />
                        <LastBookings
                            active={false}
                            day={12}
                            month="Agosto"
                            building="Edificio Reservas del Cedro el elefante feliz"
                            module="Modulo 1"
                            hour="14:00 - 16:00" />
                        <LastBookings
                            active={false}
                            day={24}
                            month="Agosto"
                            building="Edificio Reservas del Cedro"
                            module="Modulo 1"
                            hour="14:00 - 16:00" />*/ }                   </div>
                </div>
                <div className="mybookings__middleCont">
                    <h4>Tiempo de uso</h4>
                    <div className="mybookings__middleContTimeCost">
                        <h1>{totalTime} Hora(s)</h1>
                    </div>
                </div>
                <div className="mybookings__middleCont">
                    <h4>Gasto total</h4>
                    <div className="mybookings__middleContTimeCost">
                        <h1>${totalCost} <span>COP</span></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBookings
