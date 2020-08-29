import React from 'react'
import "../css/Register.css"

function Register() {
    return (
        <div className="reg">
            <h1 className="reg__title">Registro</h1>
            <div className="reg__container">
                <div className="reg__container1">
                    <form className="reg__container2" action="">
                        <input type="text" placeholder="Nombre" className="reg__containerInput" />
                        <input type="text" placeholder="Apellido" className="reg__containerInput" />
                        <input type="date" placeholder="Fecha de Nacimiento" className="reg__containerInput" />
                        <input type="float" placeholder="Número Celular" className="reg__containerInput" />
                    </form>
                </div>
                <div class="reg__containerLine"></div>
                <div className="reg__container2">
                    <form className="reg__container2" action="">
                        <input type="text" placeholder="Email" className="reg__containerInput" />
                        <input type="password" placeholder="Contraseña" className="reg__containerInput" />
                        <div className="reg__container2Cj">
                            <input type="checkbox"  id="filled-in-box" />
                            <a href=""><label for="filled-in-box"> Acepto Términos y Condiciones</label></a>
                        </div>

                        <button type="button" className="reg__containerButton">Registrarse</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Register
