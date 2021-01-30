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

exports.addSuperAdminRole = functions.https.onCall((data) => {

    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            superadmin: true
        })
    }).then(() => {


        return {

            message: `Success! ${user.uid} has been made an superadmin.`
        }
    }).catch(err => {
        return err;
    });
});

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


exports.scheduledMailsFunction = functions.pubsub.schedule('*/15 * * * *').onRun((context) => {
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
    var years=year.toString();
    var hourforquery=hour+1;
    if (minutes === 0) {
        console.log(" Entre por inicio de hora ");
        db.collection('reservas')
            .where("año", "==",years)
            .where("mes", "==", monthNames[month-1])
            .where("dia", "==", Number(day))
            .where("horaInicio", "==", hourforquery)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Send an mail for each user that have one booking in the next hour
                    return console.log(doc.id, " => Envio de correo 1 hora ", doc.data().nombreUsuario);

                });
                return true;
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

    }
    if (minutes === 45) {
        console.log(" Entre por 45 minutos ");

        db.collection('reservas')
            .where("año", "==", years)
            .where("mes", "==", monthNames[month-1])
            .where("dia", "==", Number(day))
            .where("horaInicio", "==",hourforquery)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // Send an mail for each user that have one booking in the next 15 minutes
                     console.log(doc.id, " => Envio de correo 15 minutos ", doc.data().nombreUsuario);
                });
                return console.log("Mails sended");
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

    }

    return console.log('This will be run every 15 minutes!' );

});