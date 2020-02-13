import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
//import Nav from '../components/nav'
import Navigation from '../components/Navigation'
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';
import { auth, firebase } from '../src/firebase'

class Home extends React.Component {
	render() {
		return (
			<div>
			<div className="home-body">
		<Navigation />
		<CurrentAuction />
		<HomeProducts />
			</div>;
			<div className="hero">
			<h1 className="title">Welcome to Firebase Authentication in Next.js!</h1>
			<p className="description">
			Login Below
			</p>
			<div className="row">
			<Link href="/dashboard">
			<a className="card">
			<h3>Go to Dashboard&rarr;</h3>
			<p>Visit Dashboard</p>
			</a>
			</Link>
			</div>
			</div>

			</div>
			)
	}
}
export default Home
