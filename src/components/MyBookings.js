import React, { useEffect, useState } from 'react'
import "../css/MyBookings.css"
import LastBookings from './LastBookings'
import { auth, db } from '../firebase';



function MyBookings() {

    const [mybookings, setMyBookings] = useState([]);
    const [totalTime, setTotalTime] = useState([]);
    const [totalCost, setTotalCost] = useState([]);

    var usersi = auth.currentUser;
    useEffect(() => {
        if (usersi) {
            // User is signed in.

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
            <h1>Tu Reporte de Reservas</h1>
            <div className="mybookings__middle">
                <div className="mybookings__middleCont">
                    <h4>Reservas Previas</h4>
                    <div className="mybookings__middleContBookings">
                        {
                            mybookings.map(booking =>
                                (<LastBookings
                                    key={booking.horaInicioFin+booking.dia+booking.mes+booking.idModulo}
                                    active={booking.estado}
                                    day={booking.dia}
                                    month={booking.mes}
                                    building={booking.nombreEdificio}
                                    module={booking.nombreModulo}
                                    hour={booking.horaInicioFin}
                                    idBooking = {booking.idReserva}
                                />))
                        }
                                     </div>
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
