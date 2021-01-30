
import React, { useEffect, useState } from 'react'
import {  db, firebaseConfig } from '../../firebase';
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import styled from 'styled-components';


const StyledTitle = styled.h5`
    {
        color: #002980;
        margin: 1rem;        
    }`
const StyledText = styled.h6`
    {
        color: black;
        margin: 0.1rem;        
    }`
const StyledContainer = styled(Container)`

{   align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}`

const ExpandPayment = ({ row }) => {

    const [totalPayment, setTotalPayment] = useState('')
    const [fileUrl, setFileUrl] = useState('');
    const [idRec, setidRec] = useState('');


    useEffect(() => {
        setidRec(row.original.idRecibo)
        db.collection("edificios")
        .doc(row.original.idEdificio)
        .get()
        .then(function(doc) {
            if (doc.exists) {
                setTotalPayment(doc.data().costoArriendo);
                console.log(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      
              
    }, [row.original.idRecibo])

    const uploadReceipt = async (e) => {
        const file = e.target.files[0]
        console.log(file)
        const storageRef = firebaseConfig.storage().ref()
        const fileRef = storageRef.child(file.name)
        console.log(fileRef)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
        console.log(fileUrl)
    }

    function updateStorage() {

        return db.collection('recibos')
            .doc(idRec)
            .update({
                storage: fileUrl,
                estado: "En Revision"
            }).then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }

    const onSubmit = async (e) => {

        e.preventDefault()
        updateStorage()

    }


    return (
        <div>
            <StyledContainer >

                <form onSubmit={onSubmit}>
                    <StyledContainer>

                        <StyledTitle>Total a Pagar</StyledTitle>
                        <StyledText>{totalPayment}</StyledText>
                        <StyledTitle>Elegir Archivo a Subir</StyledTitle>
                        <input type="file" onChange={uploadReceipt} />
                        <StyledText>    </StyledText>
                        <button className="btn btn-success btn-sm btn-block" >Subir Recibo</button>

                    </StyledContainer>


                </form>


            </StyledContainer>
        </div>
    );

}

export default ExpandPayment;
