import React from 'react'
import "../../css/BiwoAdmin/AddBuilding.css"


function AddBuilding() {
    return (
        <div className="addBuilding">
            <form action="">
                <label htmlFor="">Direccion</label>
                <input type="text" name="" id=""/>
                <label htmlFor="">Hora inicio Jornada</label>
                <input type="text" name="" id=""/>
                <label htmlFor="">Hora fin Jornada</label>
                <input type="text" name="" id=""/>
                <label htmlFor="">Nombre edificio</label>
                <input type="text" name="" id=""/>
                <label htmlFor="">Cantidad de modulos</label>
                <input type="number" name="" id=""/>
                <label htmlFor="">Tarifa modulo por hora </label>
                <input type="number" name="" id=""/>
                <button type="submit">Crear edificio</button>
            </form>
        </div>
    )
}

export default AddBuilding
