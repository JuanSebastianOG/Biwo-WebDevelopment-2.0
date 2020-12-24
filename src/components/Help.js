import React from 'react'
import { useEffect } from 'react';

import "../css/Help.css"
import { useState } from 'react'
import { auth, db } from '../firebase';

function Help() {
    const [input, setInput] = useState('')

    var usersi = auth.currentUser;

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("solicitudayudas").add({
            mensaje: input,
            idUsuario: usersi.uid,
        }).then(function (docRef) {
            alert("Su mensaje ha sido enviado existosamente")
            setInput('')
            //window.location.reload();
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });

    }
    useEffect(() => {
        var d = new Date();
        var newDate = new Date(d);
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        //Bogota Colombia hour
        newDate.setHours(d.getHours() );
        var day = newDate.getDate()
        var month = newDate.getMonth() + 1
        var year = newDate.getFullYear()
        var hour = d.getHours()+1
        var minutes = newDate.getMinutes()
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        // if (minutes === 0) {
        var years=year.toString();
        console.log(hour)
        console.log(" Entre por inicio de hora ");
        db.collection('reservas')
            .where("año", "==", years)
            .where("mes", "==", monthNames[month - 1])
            .where("dia", "==", Number(day))
            .where("horaInicio", "==", hour)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Send an mail for each user that have one booking in the next hour
                    console.log("entre 1 vez", doc.data());
                });

            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        /* if (usersi) {
             // User is signed in.
             console.log("Soooy", usersi.uid)
             var docRef = db.collection("usuarios").doc(usersi.uid);
             docRef.get().then(function (doc) {
                 if (doc.exists) {
                     setUserInfo(doc.data().idEdificio)
                     console.log("Document data USUARIO:", doc.data());
                 } else {
                     // doc.data() will be undefined in this case
                     console.log("No user document!");
                 }
             }).catch(function (error) {
                 console.log("Error getting document", error);
             });
         } else {
             // No user is signed in.
         }*/
    }, [usersi]);
    return (
        <div className="help">
            <h1>Centro de Ayuda</h1>
            <div className="help__containerFlex">
                <img className="help_containerFlexLeft" src="https://i.ibb.co/2tzVbFp/contact.png" alt="help" border="0" />

                <form action="" className="help__containerFlexRight">
                    <h2 htmlFor="">Envíanos un comentario:</h2>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} rows="10" cols="30" />
                    <button onClick={sendMessage}>Enviar</button>
                    <h3 htmlFor="">Responderemos a tu correo prontamente</h3>
                </form>

            </div>
        </div>
    )
}

export default Help
