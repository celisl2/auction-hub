// /////////////////////////////////////////////////////////
//    Updated: Robert Ashley  -  18 Feb 2020
//    Temporarily changed the config so that I could run locally.
//    Feel free to change config back to commented version below
//
// /////////////////////////////////////////////////////////

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


//export function loadDB() {
export default function loadDB() {
    
/*
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };
*/
    
    // Local Testing on Windows / no env setup.
    // (!!!)  REMOVE IN FINAL DEPLOYMENT
   
   const firebaseConfig = {
    apiKey: "AIzaSyDWlJFpgL3SFZv3qK5B2i_bsxAseINWUdI",
    authDomain: "auction-hub-firebase.firebaseapp.com",
    databaseURL: "https://auction-hub-firebase.firebaseio.com",
    projectId: "auction-hub-firebase",
    storageBucket: "auction-hub-firebase.appspot.com",
    messagingSenderId: "1022155304328",
    appId: "1:1022155304328:web:abda6171112fef4bb7de3d",
    measurementId: "G-LQRFCCR4R8"
   };

    // Check if app is initialized before attempting to do so
    if (!firebase.apps.length) {
        return firebase.initializeApp(firebaseConfig);
        //return firebase.initializeApp();
    }
    else {
        return firebase.app();
    }
};