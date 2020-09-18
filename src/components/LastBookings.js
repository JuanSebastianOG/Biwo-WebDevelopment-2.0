import React from 'react'
import "../css/LastBookings.css"

function LastBookings({ active, day, month, building, module, hour }) {
    let classNameDiv = "lastBookings";
    let classNameDate = "lastBookings__date";
    let classNameInfo = "lastBookings__info";

    if (active) {
        classNameDiv = "lastBookingsactive";
        classNameDate = "lastBookings__dateactive";
        classNameInfo = "lastBookings__infoactive"
    }
    return (
        <div className={classNameDiv}>
            <div className={classNameDate}>
                <h1>{day}</h1>
                <h4>{month}</h4>
            </div>
            <div className={classNameInfo}>
                <h4>{building}</h4>
                <h6>{module}</h6>
                <h5>{hour}</h5>
            </div>
        </div>
    )
}

export default LastBookings
