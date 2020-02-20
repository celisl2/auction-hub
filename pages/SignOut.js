/*
Name: Andy Estes
Group: Team 1
File: Login.js
Function: Handles the login Portion of the application using Google Firebase API.
*/

//Import Resources From Local Storage
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import {loadDB} from '../lib/firebaseConfig';
let firebase = loadDB();

class SignOut extends React.Component {
//Handles the Sign-out Function.

//Render Content
render() {

//Firebase command that signs the user out of firebase.
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
        console.log(error);
    });

//Checks to make sure the user actually logged out properly.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('An error has occured when signing out.');
      } else {
        // No user is signed in. Returns to main page.
        window.location.href = "/index";
      }
    });
    return (
<div>
</div>

    )
}

}

export default SignOut
