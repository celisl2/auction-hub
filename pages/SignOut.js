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

import withAuth from '../components/withAuth';

class SignOut extends React.Component {
//Handles the Sign-out Function.

render() {


    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
        console.log(error);
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('An error has occured when signing out.');
      } else {
        // No user is signed in.
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
