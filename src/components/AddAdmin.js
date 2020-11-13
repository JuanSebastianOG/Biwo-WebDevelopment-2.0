

import React, {useState} from 'react'
import "../css/Register.css"
import "../css/Login.css"
import {functions } from '../firebase';
import {useStateValue} from "./StateProvider";
import styled from 'styled-components';

const StyledForm = styled.div`
  {
   margin-left: 20%;
   margin-right: 20%;
   text-align: center;
   h2{
       margin-top: 10%;
   }
  }
`;
const StyledButton = styled.input`
  {
    width: fit-content;
    display: inline-block;
    padding: 10px;
    margin-left:10px;
  }
`;

function AddAdmin() {

    const [mailEdi, setMailEdi] = useState("");
    const [mailSuper, setSuper] = useState("");
  
   

    const mailEdiChangeHandler = e => {
        var mailEdif=  e.target.value;
        setMailEdi(mailEdif);
        
    }
    const mailSuperChangeHandler = e => {
        var mailSupers=  e.target.value;
        setSuper(mailSupers);
        
    }

    const addEmailAdmin = () =>{
        var addAdminRole = functions.httpsCallable('addAdminRole');
                    addAdminRole ({email:mailEdi}).then(result=>{
                        console.log(result)
                    }).catch(function(error) {
                        // Getting the Error details.
                        var code = error.code;
                        var message = error.message;
                        var details = error.details;
                        console.error("Error adding ADMIN: ", code,message,details);
                      });
        
    }
    const addEmailSuperAdmin = () =>{
        var addSuperAdminRole = functions.httpsCallable('addSuperAdminRole');
                    addSuperAdminRole ({email:mailSuper}).then(result=>{
                        console.log(result)
                    }).catch(function(error) {
                        // Getting the Error details.
                        var code = error.code;
                        var message = error.message;
                        var details = error.details;
                        console.error("Error adding ADMIN: ", code,message,details);
                      });
        
    }
    return (
        <StyledForm>

         <h2>Agregar Correo Admin Edificio</h2>
         <input  onChange={mailEdiChangeHandler} required name="email" id ="emailEdi" type="text" placeholder="Mail Admin Edificio" className="reg__containerInput" />
         <StyledButton onClick={addEmailAdmin} className="login__containerFormLoginButton" type="button" value="Agregrar" />
         
         <h2>Agregar Correo Biwo Admin</h2>
         <input  onChange = {mailSuperChangeHandler} required name="emailSuper" id = "emailSuper" type="text" placeholder="Mail Super" className="reg__containerInput" />
         <StyledButton onClick={addEmailSuperAdmin} className="login__containerFormLoginButton" type="button" value="Agregar" />

            
        </StyledForm>
    )
}

export default AddAdmin
