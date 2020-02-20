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
import Navigation from '../components/Navigation'
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';

//Firebase components.
import {loadDB} from '../lib/firebaseConfig';
//Imports an authentication listeneer to check if a user is logged in.

//import withAuth from '../components/withAuth';


/*Class: Home
Purpose: Builds the manual login form*/
class Home extends React.Component {

//Render Content
	render() {

		return(
  		<div>
		<div className="home-body">
  		<Navigation />
  		<CurrentAuction />
  		<HomeProducts />
  		</div>
  		<div className="hero">
  		<div className="row">
  		</div>
  		</div>
  		</div>
  	)

	}
}

export default withAuth(Home);
