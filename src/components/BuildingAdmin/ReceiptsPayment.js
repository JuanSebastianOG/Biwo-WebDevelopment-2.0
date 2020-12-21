
import React, { useEffect, useMemo, useState } from 'react'
import { auth, db } from '../../firebase';
import moment from 'moment';
import TableContainer from '../BiwoAdmin/TableContainer'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import styled from 'styled-components';
import ExpandPayment from './ExpandPayment'

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


    function createReceipts() {

        if (user) {

            db.collection("recibos")
                .where("idAdminEdificio", "==", user.uid)
                .get()
                .then(function (querySnapshot) {

                    console.log(querySnapshot.docs.length);

                    if (querySnapshot.docs.length === 0) {

                        console.log("no existe ingresadno por primer vez")


                        const MONTHS = () => {
                            const months = []
                            const years = []
                            const dateStart = moment()
                            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                            ];
                            const dateEnd = moment().add(48, 'month')
                            while (dateEnd.diff(dateStart, 'months') >= 0) {
                                years.push(dateStart.format('YYYY'))
                                months.push(monthNames[dateStart.format('MM') - 1])
                                dateStart.add(1, 'month')
                            }
                            console.log(months)
                            console.log(years)
                            return months
                        }

                        const YEARS = () => {

                            const years = []
                            const dateStart = moment()

                            const dateEnd = moment().add(48, 'month')
                            while (dateEnd.diff(dateStart, 'months') >= 0) {
                                years.push(dateStart.format('YYYY'))
                                dateStart.add(1, 'month')
                            }

                            console.log(years)
                            return years
                        }


                        const monthsWithYears = []

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
                                        var x = 0
                                        for (x = 0; x < 48; x++) {

                                            monthsWithYears[x] = {
                                                año: years[x],
                                                mes: months[x],
                                                estado: "No Pago",
                                                idAdminEdificio: user.uid,
                                                idEdificio: doc.id,
                                                nombreAdmin: nombreAdmin,
                                                nombreEdificio: doc.data().nombre,
                                                storage: "",
                                                idRecibo: ""
                                            }
                                            db.collection("recibos").add(monthsWithYears[x])
                                                .then(function (docRef) {
                                                    console.log("Document written with ID: ", docRef.id)
                                                    db.collection("recibos")
                                                        .doc(docRef.id)
                                                        .update({
                                                            idRecibo: docRef.id
                                                        });
                                                })

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




    useEffect(() => {

        createReceipts()

        if (user) {
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


    }, [user])

    const renderRowSubComponent = row => {
        return (
            <ExpandPayment row={row} ></ExpandPayment>
        )
    }

    const columns = useMemo(
        () => [

            {
                Header: "Edificio",
                accessor: "nombreEdificio",
            },

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
                    if (estado === "No Pago")
                        return <div>
                            {estado}
                            <StyledTitleRed></StyledTitleRed>
                        </div>
                    else if (estado === "En Revision")
                        return <div>
                            {estado}
                            <StyledTitleYellow></StyledTitleYellow>
                        </div>
                    else if (estado === "Pagado")
                        return <div>{estado}
                            <StyledTitleGreen></StyledTitleGreen>
                        </div>
                }
            },
            {
                Header: "Pagar",

                id: 'expander', // 'id' is required


                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        <button type="button" className="btn btn-success btn-sm btn-block"  > Pagar</button>
                    </span>

                )


            },

        ])





    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={receiptsPayments} renderRowSubComponent={renderRowSubComponent} />
        </Container>
    )
}

export default ReceiptsPayment
