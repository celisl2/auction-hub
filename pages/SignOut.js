/*
Name: Andy Estes
Group: Team 1
File: Login.js
Function: Handles the login Portion of the application using Google Firebase API.
*/

//Import Resources From Local Storage
import React from 'react'
import Link from 'next/link'
import Head from 'next/head';
import {loadDB} from '../lib/firebaseConfig';

class SignOut extends React.Component {
//Handles the Sign-out Function.

render() {

    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
        console.log(error);
    });

    return (
<div>
</div>

    )
}

}

export default SignOut
