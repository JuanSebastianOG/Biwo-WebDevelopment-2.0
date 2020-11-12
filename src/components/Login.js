
import React, { useState } from 'react'
import "../css/Login.css"
import { useHistory } from "react-router-dom";
import { auth } from '../firebase';


function Login() {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userLogIn = (e) => {
        e.preventDefault();
        console.log( username, password)
        auth.signInWithEmailAndPassword(username, password)
        .then(()=>{

            auth.currentUser.getIdTokenResult()
            .then((idTokenResult) => {
              // Confirm the user is an Admin.
              if (idTokenResult.claims.superadmin) {
                history.push("/adminReservas");
              } else {
                history.push("/misreservas");
              }
            })
            .catch((error) => {
              console.log(error);
            });

            
        })
        .catch((e)=> alert(e.message));

    }
    const userRegister = (e) => {
        e.preventDefault();
        console.log( username, password)

        history.push("/registrarse");
    }
    return (
        <div className="login">

            <div className="login__container">
                <h2>Iniciar Sesión</h2>
                <form action="" className="login__containerForm">
                    <input
                        className="login__containerFormUser"
                        type="text" placeholder="Usuario"
                        value={username} onChange={(e) => setUsername(e.target.value)} />

                    <div className="login__containerFormPassForg">
                        <input
                            className="login__containerFormPassword"
                            type="password" placeholder="Contraseña"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="fname">Olvidé mi contraseña</label>
                    </div>
                    <div className="login__containerButtons">
                        <input onClick={userLogIn} className="login__containerFormLoginButton" type="submit" value="Iniciar Sesion" />
                       
                        <input onClick={userRegister} className="login__containerFormRegisterButton" type="button" value="Registrarse" />
                        
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Login
