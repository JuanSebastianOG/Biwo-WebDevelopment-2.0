
import React, { useEffect,useMemo, useState } from 'react'
import { auth, db, firebaseConfig } from '../../firebase';
import moment from 'moment';
import TableContainer from '../BiwoAdmin/TableContainer'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import styled from 'styled-components';

const StyledTitleRed = styled.div`
    {
        background-color: #ff4d4d;
        margin: 1rem; 
        border-radius: 50%;   
        height: 15px;
         width: 15px;    
    }`
const StyledTitleYellow = styled.div`
    {
        background-color: #ffcc00;
        margin: 1rem; 
        border-radius: 50%;   
        height: 15px;
         width: 15px;        
    }`
const StyledTitleGreen = styled.div`
    {
        background-color: #33cc33;
        margin: 1rem; 
        border-radius: 50%;   
        height: 15px;
         width: 15px;       
    }`

function ReceiptsPayment() {
    var user = auth.currentUser;
    const [receiptsPayments, setReceiptsPayments] = useState([]);
    const [fileUrl, setFileUrl] = useState('');

    function createReceipts() {
        if (user) {

            db.collection("recibos")
                .where("idAdminEdificio", "==", user.uid)
                .get()
                .then(function (querySnapshot) {

                    console.log(querySnapshot.docs.length);

                    if (querySnapshot.docs.length == 0) {

                        console.log("no existe ingresadno por primer vez")


                        const YEARS = () => {
                            const years = []
                            const dateStart = moment()
                            const dateEnd = moment().add(4, 'y')
                            while (dateEnd.diff(dateStart, 'years') >= 0) {
                                years.push(dateStart.format('YYYY'))
                                dateStart.add(1, 'year')
                            }
                            return years
                        }

                        const MONTHS = () => {
                            const months = []
                            const dateStart = moment()
                            const dateEnd = moment().add(48, 'month')
                            while (dateEnd.diff(dateStart, 'months') >= 0) {
                                months.push(dateStart.format('MMMM'))
                                dateStart.add(1, 'month')
                            }
                            return months
                        }


                        const monthsWithYears = new Array()

                        var nombreAdmin

                        db.collection("usuarios").doc(user.uid)
                            .get()
                            .then(function (doc) {
                                nombreAdmin = doc.data().name
                                console.log("este el nombre Admin", nombreAdmin)
                            })



                        db.collection("usuarios").doc(user.uid).get().then(function (doc) {

                            db.collection("edificios").doc(doc.data().idEdificio)
                                .get().then(function (doc) {
                                    if (doc.exists) {
                                        const years = YEARS()
                                        const months = MONTHS()
                                        var y = 0
                                        var x = 0
                                        for (x = 0; x < 48; x++) {
                                            if (x % 12 == 0 && x != 0) {
                                                y++
                                            }
                                            monthsWithYears[x] = {
                                                año: years[y],
                                                mes: months[x],
                                                estado: "No Pago",
                                                idAdminEdificio: user.uid,
                                                idEdificio: doc.id,
                                                nombreAdmin: nombreAdmin,
                                                nombreEdificio: doc.data().nombre,
                                                storage: ""
                                            }
                                            db.collection("recibos").add(monthsWithYears[x])

                                        }
                                    }


                                })

                        })



                    }
                    else {
                        console.log("si existen")
                    }


                })

        }
    }

    function getReceipts() {

        if(user){
            db.collection('recibos').where("idAdminEdificio", "==", user.uid)
            .onSnapshot(function (querySnapshot) {
                var receipts = []
                querySnapshot.forEach(function (doc) {

                    var newReceipt = doc.data()
                    newReceipt.idReceipt = doc.id
                    receipts.push(newReceipt)
                });
                console.log(receipts);
                setReceiptsPayments(receipts);
            })

        }

        

    }

    useEffect(() => {

        createReceipts();

        getReceipts();

        return function cleanup() {

        }
    }, [])

    const columns = useMemo(
        () => [
            
            {
                Header: "Mes",
                accessor: "mes",
            },
            {
                Header: "Año",
                accessor: "año",
            },
            {
                Header: "Estado de Pago",
                Cell: (cellProps) => {
                    const {
                        estado,
                    } = cellProps.row.original
                    if (estado == "No Pago")
                        return <div>
                            {estado}
                            <StyledTitleRed></StyledTitleRed>
                        </div>
                    else if (estado == "En Revisión")
                        return <div>
                            {estado}
                            <StyledTitleYellow></StyledTitleYellow>
                        </div>
                    else if (estado == "Pagado")
                        return <div>{estado}
                            <StyledTitleGreen></StyledTitleGreen>
                        </div>
                }
            },
            {
                Header: "Pagar",
                Cell: () => (
                    <form onSubmit={onSubmit}>

                        <input type="file" onChange={uploadReceipt} />

                        <button onClick={onSubmit} >Subir Recibo</button>
                    </form>
                )


            },

        ])


    const uploadReceipt = async (e) => {
        const file = e.target.files[0]
        const storageRef = firebaseConfig.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getReceipts().then(result => {
            result.forEach(docSnapshot => {
                console.log(docSnapshot.data());
                docSnapshot.set()
            });
        });
    }

    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={receiptsPayments} />
        </Container>
    )
}

export default ReceiptsPayment
