const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
//Email Configuration
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgridbiwo.key);
const TEMPLATE_IDBOOKING = functions.config().sendgridbiwo.templatebooking;
const TEMPLATE_IDHELP = functions.config().sendgridbiwo.templatehelp;
const TEMPLATE_IDREGISTER = functions.config().sendgridbiwo.templateregister;


exports.addAdminRole = functions.https.onCall((data) => {

    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {


        return {

            message: `Success! ${user.uid} has been made an admin.`
        }
    }).catch(err => {
        return err;
    });
});


exports.emailBooking = functions.firestore.document('/reservas/{reservaId}')
    .onCreate(async (snapshot, context) => {

        const newBooking = snapshot.data();
        db.collection('usuarios').doc(newBooking.idUsuario).get().then(function (doc) {
            if (doc.exists) {

                const msg = {
                    to: doc.data().email, // Change to your recipient
                    from: 'biwodev@gmail.com', // Change to your verified sender
                    template_id: TEMPLATE_IDBOOKING,
                    subject: 'Thanks for Contacting Biwo',
                    dynamic_template_data: {
                        name: doc.data().name,
                    }
                }
                console.log("Mail sended!");

                return sgMail.send(msg);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return null;

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            return null;

        });

    });

exports.emailRegister = functions.firestore.document('/usuarios/{usuarioId}')
    .onCreate(async (snapshot, context) => {

        const newUser = snapshot.data();
        db.collection('usuarios').doc(newUser.idUsuario).get().then(function (doc) {
            if (doc.exists) {

                const msg = {
                    to: doc.data().email, // Change to your recipient
                    from: 'biwodev@gmail.com', // Change to your verified sender
                    template_id: TEMPLATE_IDREGISTER,
                    subject: 'Thanks for Contacting Biwo',
                    dynamic_template_data: {
                        name: doc.data().name,
                    }
                }
                console.log("Mail sent!");

                return sgMail.send(msg);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return null;

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            return null;

        });

    });



exports.emailHelp = functions.firestore.document('/solicitudayudas/{solicitudayudaId}')
    .onCreate(async (snapshot, context) => {

        const help = snapshot.data();
        db.collection('usuarios').doc(help.idUsuario).get().then(function (doc) {
            if (doc.exists) {
                const msg = {
                    to: doc.data().email, // Change to your recipient
                    from: 'biwodev@gmail.com', // Change to your verified sender
                    template_id: TEMPLATE_IDHELP,
                    subject: 'Thanks for Contacting Biwo',
                    dynamic_template_data: {
                        name: doc.data().name,
                        email: doc.data().email,
                        message: help.mensaje
                    }
                }

                return sgMail.send(msg);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return null;

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            return null;
        });

    });


exports.scheduledMailsFunction = functions.pubsub.schedule('* * * * *').onRun((context) => {
    var d = new Date();
    var newDate = new Date(d);
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    //Bogota Colombia hour
    newDate.setHours(d.getHours() - 5);
    var day = newDate.getDate()
    var month = newDate.getMonth() + 1
    var year = newDate.getFullYear()
    var hour = newDate.getHours()
    var minutes = newDate.getMinutes()
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
   // if (minutes === 0) {
        console.log(" Entre por inicio de hora ");
        db.collection('reservas')
            .where("año", "==", year.toString())
            .where("mes", "==", monthNames[month-1].toString)
            .where("dia", "==", Number(day))
            .where("horaInicio", "==", Number(hour + 1))
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Send an mail for each user that have one booking in the next hour
                    return console.log("entre 1 vez",doc.data());
                });
                return true;
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

    //}
    if (minutes === 45) {
        console.log(" Entre por 45 minutos ");

        db.collection('reservas')
            .where("año", "==", year)
            .where("mes", "==", monthNames[month-1])
            .where("dia", "==", day)
            .where("horaInicio", "==", (hour + 1))
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Send an mail for each user that have one booking in the next 15 minutes
                     console.log(doc.id, " => ", doc.data());
                });
                return console.log("Mails sended");
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

    }

    return console.log('This will be run every 15 minutes!' );

});