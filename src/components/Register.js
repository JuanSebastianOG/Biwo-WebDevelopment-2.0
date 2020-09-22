import React, { useState, useEffect } from 'react'
import "../css/Register.css"
import { db, auth } from '../firebase';
import { useHistory } from "react-router-dom";
/* eslint-disable */
function Register() {
    const history = useHistory();

    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        date: '',
        phonenumber: '',
        email: '',
        password: ''
    });


    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [existEmail, setExistEmail] = useState('');
    const [allowSubmit, setAllowSubmit] = useState(false);


    const validEmailRegex =
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const changeHandler = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });

        switch (e.target.name) {


            case 'phonenumber':
                setPhoneError(
                    e.target.value.length === 10
                        ? ''
                        : 'El numero de celular debe tener 10 carácteres'

                )
                break;
            case 'email':
                var arraycontainsemail = (validEmails[0].indexOf(userData.email) > -1);

                if (!arraycontainsemail) {
                    setExistEmail('')
                } else
                    setExistEmail('El correo no existe. Comuniquese con el administrador')
                setEmailError(
                    validEmailRegex.test(e.target.value)
                        ? ''
                        : 'Correo Inválido'
                )


                break;
            case 'password':
                setPasswordError(
                    e.target.value.length < 8
                        ? 'La contraseña debe tener al menos 8 digitos'
                        : ''
                )

                break;

            default:
                break;
        }

        setAllowSubmit(validForm());


    }

    function validForm() {
        if (phoneError.length === 0 && passwordError.length === 0 && emailError.length === 0 && existEmail.length === 0) {

            if (userData.name.length > 0 && userData.lastname.length > 0 && userData.date.length > 0 && userData.phonenumber.length > 0 && userData.password.length > 0 && userData.email.length > 0 && (document.getElementById("myCheck").checked)) {
                console.log("Ready to Submit");
                return true;
            }
            else {
                console.log("Fields not Completed");
                return false;
            }

        }
        else {
            console.log("Errors Presented");
            return false;

        }

    }

    function validEmail() {
        var arraycontainsemail = (validEmails[0].indexOf(userData.email) > -1);

        if (arraycontainsemail) {
            setExistEmail('');
            return true;

        }
        else {
            setExistEmail('El correo no existe. Comuniquese con el administrador');
            return false;
        }


    }
    const [validEmails, setValidEmails] = useState([]);
    // Runs code in specific conditions   
    useEffect(() => {
        db.collection('correos_permitidos').onSnapshot(snapshot => {
            setValidEmails(snapshot.docs.map(doc => doc.data().correos));
        })

    }, []);

    const submitRegister = e => {
        e.preventDefault();

        if (validEmail()) {


            var userDataF = {
                name: userData.name,
                lastname: userData.lastname,
                date: userData.date,
                phonenumber: userData.phonenumber,
                email: userData.email,
            };
            console.log(userData.name, 'holiii')
            auth.createUserWithEmailAndPassword(userData.email, userData.password)
                .then(() => {
                    db.collection("usuarios").add(
                        userDataF
                    )
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            history.push("/reservar");
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                        });
                })
                .catch((e) => setEmailError("Ya existe una cuenta asociada a este correo"));

        }
    }


    return (


        <div className="reg">
            <h1 className="reg__title">Registro</h1>
            <div className="reg__container">
                <form className="reg__container" id="reg_form" action="">
                    <div className="reg__container1">

                        <input onChange={changeHandler} required name="name" type="text" placeholder="Nombre" className="reg__containerInput" />
                        <input onChange={changeHandler} name="lastname" type="text" placeholder="Apellido" className="reg__containerInput" />
                        <input onChange={changeHandler} required name="date" type="date" placeholder="Fecha de Nacimiento" className="reg__containerInput" />
                        <input onChange={changeHandler} name="phonenumber" type="number" maxLength="10" placeholder="Número Celular" className="reg__containerInput" />
                        {phoneError.length > 0 &&
                            <span className='error'>{phoneError}</span>}

                    </div>
                    <div className="reg__containerLine"></div>
                    <div className="reg__container2">

                        <input onChange={changeHandler} name="email" type="text" placeholder="Email" className="reg__containerInput" />
                        {emailError.length > 0 &&
                            <span className='error'>{emailError}</span>}
                        <input onChange={changeHandler} name="password" type="password" placeholder="Contraseña" className="reg__containerInput" />
                        {passwordError.length > 0 &&
                            <span className='error'>{passwordError}</span>}
                        <div className="reg__container2Cj">
                            <input type="checkbox" name="checkbox" onChange={changeHandler} id="myCheck" />
                            <a href="google.com"><label > Acepto Términos y Condiciones</label></a>
                        </div>
                        <button disabled={!allowSubmit} type="submit" form="reg_form" value="Submit" onClick={submitRegister} id="buttonSubs" className="reg__containerButton">Registrarse</button>
                        {existEmail.length > 0 &&
                            <span className='error'>{existEmail}</span>}

                    </div>
                </form>

            </div>

        </div>
    )
}

export default Register
