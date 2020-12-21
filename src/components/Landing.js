import React, { useEffect } from 'react'
import "../css/Landing.css"
import { auth } from '../firebase';
import { useHistory } from "react-router-dom";


function Landing() {

    const history = useHistory();
    useEffect(() => {


        if (auth.currentUser) {
            auth.currentUser.getIdTokenResult()
                .then((idTokenResult) => {
                    // Confirm the user is an Admin.
                    if (idTokenResult.claims.superadmin) {
                        history.push("/adminReservas");
                    } else if (idTokenResult.claims.admin) {
                        history.push("/edAdminPagos");
                    }
                    else {
                        history.push("/reservar");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            history.push("/landing");
        }

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="landing">
            <img className="landing__background" src="https://i.ibb.co/WKDYk04/Grupo-37.png" alt="Grupo-37" border="0"></img>

            <div className="landing__bottom">
                <img className="landing_bottomImg" src="https://i.ibb.co/Z6KXqd5/Imagen-5.png" alt="Imagen-5" border="0" />
                <div className="landing__bottomRect">
                    <img className="landing_bottomImg" src="https://i.ibb.co/3R5V766/Imagen-2.png" alt="Imagen-2" border="0" />
                    <div className="landingTextButton">
                        <h5>Biwo es una empresa de
                        servicios y tecnología que
                        facilita el acceso a
                        espacios de trabajo en áreas
                        subutilizadas.</h5>
                        <button type="button">Leer más!</button>
                    </div>
                </div>
                <img className="landing_bottomImg" src="https://i.ibb.co/xhQhYj3/Imagen-4.png" alt="Imagen-4" border="0" />
            </div>
        </div>
    )
}

export default Landing
