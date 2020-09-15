import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAzcrcXdZVgkANMDi4VRE5oXg0-ydJJpIA",
    authDomain: "biwowebapp.firebaseapp.com",
    databaseURL: "https://biwowebapp.firebaseio.com",
    projectId: "biwowebapp",
    storageBucket: "biwowebapp.appspot.com",
    messagingSenderId: "542982172403",
    appId: "1:542982172403:web:17a958fa22665ca1599186",
    measurementId: "G-BWX80CB6LH"
  });

const db = firebaseConfig.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };