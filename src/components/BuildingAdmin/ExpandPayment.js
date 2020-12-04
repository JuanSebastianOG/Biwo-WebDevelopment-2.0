
import React, { useEffect, useMemo, useState } from 'react'
import { auth, db, firebaseConfig } from '../../firebase';
import moment from 'moment';
import TableContainer from '../BiwoAdmin/TableContainer'
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

    const [totalPayment, setTotalPayment] = useState([])
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        db.collection('reservas')
            .where("mes","==",row.original.mes)
            .where("año","==",row.original.año)
        
            .onSnapshot(function (querySnapshot) {
                var totalMesAño = 0
                querySnapshot.forEach(function (doc) {

                        
                        console.log(row.original.año,doc.data().year);
                        totalMesAño = totalMesAño + doc.data().costoReserva
                        console.log(totalMesAño);
                    

                });
                console.log(totalMesAño);
                setTotalPayment(totalMesAño);
            })
        return () => {

        }
    }, [])

    const uploadReceipt = async (e) => {
        const file = e.target.files[0]
        const storageRef = firebaseConfig.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
    }


    return (
        <div>
            <StyledContainer >
                <form >

                    <input type="file" onChange={uploadReceipt} />
                    <StyledTitle>Total a Pagar</StyledTitle>
                    <StyledText>{totalPayment}</StyledText>
                    <button className="btn btn-success btn-sm btn-block" >Subir Recibo</button>
                </form>
            </StyledContainer>
        </div>
    );

}

export default ExpandPayment;
