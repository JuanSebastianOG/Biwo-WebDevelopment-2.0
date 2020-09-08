import React, {useState}from 'react'
import "../css/Register.css"

function Register() {

    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        date: '',
        phonenumber: '',
        email: '',
        password: ''
     });
     const changeHandler = e => {
        setUserData({...userData, [e.target.name]: e.target.value})
     }

     const submitRegister = e => {
        e.preventDefault();
        console.log('holii',userData)
     }
    return (
        <div className="reg">
            <h1 className="reg__title">Registro</h1>
            <div className="reg__container">
                <div className="reg__container1">
                    <form className="reg__container2" action="">
                        <input onChange={changeHandler} name="name" type="text" placeholder="Nombre" className="reg__containerInput" />
                        <input onChange={changeHandler} name="lastname"type="text" placeholder="Apellido" className="reg__containerInput" />
                        <input onChange={changeHandler} name="date"type="date" placeholder="Fecha de Nacimiento" className="reg__containerInput" />
                        <input onChange={changeHandler} name="phonenumber"type="float" placeholder="Número Celular" className="reg__containerInput" />
                    </form>
                </div>
                <div className="reg__containerLine"></div>
                <div className="reg__container2">
                    <form className="reg__container2" action="">
                        <input onChange={changeHandler} name="email"  type="text" placeholder="Email" className="reg__containerInput" />
                        <input onChange={changeHandler} name="password" type="password" placeholder="Contraseña" className="reg__containerInput" />
                        <div className="reg__container2Cj">
                            <input type="checkbox"  id="filled-in-box" />
                            <a href="google.com"><label > Acepto Términos y Condiciones</label></a>
                        </div>  
                        <button type="button" onClick ={submitRegister} className="reg__containerButton">Registrarse</button>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default Register
