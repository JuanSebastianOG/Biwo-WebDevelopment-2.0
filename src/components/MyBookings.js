import React, { useEffect, useState } from 'react'
import "../css/MyBookings.css"
import LastBookings from './LastBookings'
import { auth, db } from '../firebase';
import Booking from './Booking';

function MyBookings() {

    const [mybookings, setMyBookings] = useState([]);
    var usersi = auth.currentUser;
    useEffect(() => {
        if (usersi) {
            // User is signed in.
            console.log("Soooy", usersi.uid)
            db.collection('reservas').where("idUsuario", "==", usersi.uid).get()
                .then(function (querySnapshot) {
                    var myBookings = []
                    querySnapshot.forEach(function (doc) {
                        console.log("Document data effect:", doc.data());
                        myBookings.push(doc.data())
                    });
                    setMyBookings(myBookings)
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
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
                        {/*
                            mybookings.map(booking =>
                                (<LastBookings
                                    active={booking.estado}
                                    day={booking.fecha}
                                    month={booking.horaFin}
                                    building={booking.idEdificio}
                                    module={booking.idModulo}
                                    hour={booking.horaFin}
                                />))*/

                        }
                        <LastBookings
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
                            hour="14:00 - 16:00" />
                    </div>
                </div>
                <div className="mybookings__middleCont">
                    <h4>Tiempo de uso</h4>
                    <div className="mybookings__middleContTimeCost">
                        <h1>8 Horas</h1>
                    </div>
                </div>
                <div className="mybookings__middleCont">
                    <h4>Gasto total</h4>
                    <div className="mybookings__middleContTimeCost">
                        <h1>$100.000 <span>COP</span></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBookings
