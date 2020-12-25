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
