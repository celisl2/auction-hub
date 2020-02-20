/*
Contributers: Andy Estes, Laura Celis
Group: Team 1
File: Login.js
Function: Handles the login Portion of the application using Google Firebase API.
*/

//Next and React Components.
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import router from 'next/router';

//Local File components.
import LoginNav from '../components/LoginNav'


//Firebase components.
import {loadDB} from '../lib/firebaseConfig';
let firebase = loadDB();

import withAuth from '../components/withAuth'


//Imports an authentication listeneer to check if a user is logged in.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	// User is signed in.
	router.push('/home')

  } else {
	// No user is signed in.
	console.log('A Firebase error has occured.');
  }
});
/*Class: Home
Purpose: Builds the manual login form*/
class Home extends React.Component {


//Render Content
	render() {


		return(
  		<div>
		<div className="home-body">
  		<LoginNav />
  		</div>
  		<div className="hero">
  		<div className="row">
  		</div>
  		</div>
  		</div>
  	)

	}
}

export default Home;
