import React, { useState } from 'react'
import "../css/Register.css"
import "../css/Login.css"
import { db, functions } from '../firebase';
import styled from 'styled-components';

const StyledForm = styled.div`
  {
    margin-left: 1rem;
    margin-right: 1rem;
    text-align: center;
    display:grid;
    place-items: center;
  }
`;
const Styledh2 = styled.h2`
  {
    font-family: 'Neue Titles';
    color: #002980; 
    margin-top: 4rem; 
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
    var mailEdif = e.target.value;
    setMailEdi(mailEdif);

  }
  const mailSuperChangeHandler = e => {
    var mailSupers = e.target.value;
    setSuper(mailSupers);

  }

  const addEmailAdmin = () => {

    if (window.confirm("Está seguro que quiere dar permisos de usuario edificio al usuario " + document.getElementById("emailEdi").value + "?")) {
      var addAdminRole = functions.httpsCallable('addAdminRole');
      addAdminRole({ email: mailEdi }).then(result => {

        db.collection("usuarios").where("email", "==", document.getElementById("emailEdi").value)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());

              db.collection("usuarios").doc(doc.id).update({
                "tipoUsuario": 'Administrador edificio',
              })
                .then(function () {
                  console.log("Document successfully updated!");
                  window.location.reload();
                });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });

      }).catch(function (error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.error("Error adding ADMIN: ", code, message, details);
      });

    }


  }
  const addEmailSuperAdmin = () => {

    if (window.confirm("Está seguro que quiere dar permisos de superadmin al usuario " + document.getElementById("emailSuper").value + "?")) {
      var addSuperAdminRole = functions.httpsCallable('addSuperAdminRole');
      addSuperAdminRole({ email: mailSuper }).then(result => {
        db.collection("usuarios").where("email", "==", document.getElementById("emailSuper").value)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());

              db.collection("usuarios").doc(doc.id).update({
                "tipoUsuario": 'Administrador Biwo',
              })
                .then(function () {
                  console.log("Document successfully updated!");
                  window.location.reload();
                });
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });


      }).catch(function (error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.error("Error adding ADMIN: ", code, message, details);
      });

    }


  }
  return (
    <StyledForm>

      <Styledh2>Agregar Correo Admin Edificio</Styledh2>
      <input onChange={mailEdiChangeHandler} required name="email" id="emailEdi" type="text" placeholder="Mail Admin Edificio" className="reg__containerInput" />
      <StyledButton onClick={addEmailAdmin} className="login__containerFormLoginButton" type="button" value="Agregrar" />

      <Styledh2>Agregar Correo Biwo Admin</Styledh2>
      <input onChange={mailSuperChangeHandler} required name="emailSuper" id="emailSuper" type="text" placeholder="Mail Super" className="reg__containerInput" />
      <StyledButton onClick={addEmailSuperAdmin} className="login__containerFormLoginButton" type="button" value="Agregar" />


    </StyledForm>
  )
}

export default AddAdmin
