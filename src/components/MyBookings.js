import React from 'react'
import "../css/MyBookings.css"

function MyBookings() {
    return (
        <div className="mybookings">
            <h1>Tu reporte de Reservas</h1>
            <div className="mybookings__middle">
                <div className="mybookings__middleCont">
                    <h4>Reservas previas</h4>
                    <div className="mybookings__middleContBookings">

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
