
import React, { useEffect, useState } from 'react'
import { auth, db, firebaseConfig } from '../../firebase';
import moment from 'moment';

function ReceiptsPayment() {
    var user = auth.currentUser;

    useEffect(() => {
        
        if (user)  {

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
                                months.push(dateStart.format('M'))
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
    
        return function cleanup ()  {
         
        }
    }, [])

    const [fileUrl, setFileUrl] = useState('');


    const uploadReceipt = async (e) => {
        const file = e.target.files[0]
        const storageRef = firebaseConfig.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
    }

    async function getReceipts() {
        const currentUser = auth.currentUser.uid;
        const receiptRef = db.collection('recibos');
        const receiptMonth = receiptRef.where('mes', '==', "Noviembre").get();
        const receiptAdmin = receiptRef.where('idAdminEdificio', '==', currentUser).get();
        const receiptYear = receiptRef.where('año', '==', '2020').get();

        const [monthSnapshot, adminSnapshot, yearSnapshot] = await Promise.all([
            receiptMonth,
            receiptAdmin,
            receiptYear
        ]);

        const monthArray = monthSnapshot.docs;
        const adminArray = adminSnapshot.docs;
        const yearArray = yearSnapshot.docs;

        const receiptsArray1 = adminArray.filter(value => monthArray.includes(value));
        const receiptsArray2 = receiptsArray1.filter(value => yearArray.includes(value));


        return adminArray;
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
        <div>
            <form onSubmit={onSubmit}>

                <input type="file" onChange={uploadReceipt} />

                <button onClick={onSubmit} >Subir Recibo</button>
            </form>

        </div>
    )
}

export default ReceiptsPayment
