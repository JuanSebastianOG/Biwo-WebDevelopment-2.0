import React from 'react'
import "../css/Help.css"
import { useState } from 'react'

function Help() {
    const [input, setInput] = useState('')
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed -->", input);
        setInput('')
    }
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
