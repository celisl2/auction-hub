/*
Contributers: Andy Estes, Laura Celis
Group: Team 1
File: dashboard.js
Function: Shows the Regular User dashboard.
*/

//Next and React Components.
import React from 'react';
import Head from 'next/head'
import Link from 'next/link'

//Local File components.
import Navigation from '../components/Navigation'

//Firebase components.
import {loadDB} from '../lib/firebaseConfig';
let firebase = loadDB();

//Imports an authentication listeneer to check if a user is logged in.
//Imports an authentication listeneer to check if a user is logged in.
import withAuth from '../components/withAuth';


/*Class: Dashboard
Purpose: Renders the Dashboard Components.*/
class Dashboard extends React.Component {

	//Render content.
	render() {
		return (
			<div>
			<Navigation />
			<h1>Dashboard Page</h1>
			<p>You can't go into this page if you are not authenticated.</p>
			</div>
			)
		}
}

export default withAuth(Dashboard);
