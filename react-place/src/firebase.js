import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//const firebase = require("firebase");

/*
import "firebase/auth";
const firebaseConfig = {
    apikey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE.PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBcyl4eNj4NTi6LPhKpYBBbMhV_7cr3GUU",
    authDomain: "task-application-272a6.firebaseapp.com",
    projectId: "task-application-272a6",
    storageBucket: "task-application-272a6.appspot.com",
    messagingSenderId: "956485694916",
    appId: "1:956485694916:web:9e3a12a681db647521a091",
});
*/

const firebaseConfig = {
    apiKey: "AIzaSyBcyl4eNj4NTi6LPhKpYBBbMhV_7cr3GUU",
    authDomain: "task-application-272a6.firebaseapp.com",
    projectId: "task-application-272a6",
    storageBucket: "task-application-272a6.appspot.com",
    messagingSenderId: "956485694916",
    appId: "1:956485694916:web:9e3a12a681db647521a091",
};

/*
const app = initializeApp(firebaseConfig);

*/
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db;
/*
//firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
*/
