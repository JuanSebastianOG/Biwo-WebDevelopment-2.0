import React, { useState } from 'react'
import "../../css/BiwoAdmin/AddBuilding.css"
import { db } from '../../firebase';


function AddBuilding() {
    const [buildingData, setBuildingData] = useState({
        direccion: '',
        estado: true,
        horaFin: '',
        horaInicio: '',
        nombre: '',
        numModulos: '',
        tarifa: '',
    });
    const [form, setform] = useState(false)

    const changeHandler = e => {
        setBuildingData({ ...buildingData, [e.target.name]: e.target.value });
    }
    const showForm = e => {
        setform(!form)
    }
    const onSubmitBuilding = e => {
        e.preventDefault();

        console.log(buildingData)
        var idModulos = []
        if (Number(buildingData.horaFin) > Number(buildingData.horaInicio)) {
            db.collection("edificios").add({
                direccion: buildingData.direccion,
                estado: true,
                horaFin: buildingData.horaFin,
                horaInicio: buildingData.horaInicio,
                nombre: buildingData.nombre,
                numModulos: buildingData.numModulos,
                tarifa: buildingData.tarifa,
            }).then(function (docRef) {
                console.log("aca estamos", docRef.id)
                for (let i = 0; i < Number(buildingData.numModulos); i++) {
                    db.collection("modulos").add({
                        idEdificio: docRef.id,
                        nombreModulo: "Módulo " + (i + 1)
                    }).then(function (docRefM) {
                        console.log("Se ha anadido el modulo")
                        idModulos.push(docRefM.id)
                        var buildingRef = db.collection("edificios").doc(docRef.id);
                        buildingRef.update({
                            idModulos
                        })
                            .then(function () {
                                console.log("Document successfully updated!");
                            })
                            .catch(function (error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
                }


                alert("Se ha anadido el edificio")
                window.location.reload();


            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
        } else {
            alert("La hora fin debe ser despues de la hora inicio")

        }

    }
    if (form)
        return (
            <div className="addBuilding">
                <button onClick={() => showForm()} type="button" style={{ marginTop: 40 }} className="btn btn-danger btn-sm " >Cerrar formulario</button>
                <form onSubmit={onSubmitBuilding} action="">
                    <label htmlFor="">Dirección</label>
                    <input onChange={changeHandler} required type="text" name="direccion" id="" placeholder="eg. (Cll 66 #22b - 61)" />
                    <label htmlFor="">Hora inicio Jornada</label>
                    <input onChange={changeHandler} required type="number" name="horaInicio" id="" placeholder="1-23" min={1} max={23} />
                    <label htmlFor="">Hora fin Jornada</label>
                    <input onChange={changeHandler} required type="number" name="horaFin" id="" placeholder="2-24 mayor a inicio jornada " min={1} max={24} />
                    <label htmlFor="">Nombre edificio</label>
                    <input onChange={changeHandler} required type="text" name="nombre" id="" />
                    <label htmlFor="">Cantidad de módulos </label>
                    <input onChange={changeHandler} required type="number" name="numModulos" id="" min={1} max={15} placeholder="1-15" />
                    <label htmlFor="">Tarifa módulo por hora </label>
                    <input onChange={changeHandler} required type="number" name="tarifa" id="" min={1000} max={10000} placeholder="1000-10000" />
                    <button type="submit">Crear edificio</button>
                </form>
            </div>
        )
    else
        return (
            <div className="addBuilding">
                <button onClick={() => showForm()} type="button"  style={{ marginTop: 40 }}  className="btn btn-success btn-sm " >Crear edificio</button>
            </div>
        )
}

export default AddBuilding
