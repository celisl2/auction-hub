/*
Name: Andy Estes
Group: Team 1
File: Login.js
Function: Handles the login Portion of the application using Google Firebase API.
*/

//Next and React Components.
import React from 'react'
import Link from 'next/link'
import Head from 'next/head';

//Form Building Components
import { Formik } from 'formik';
import * as Yup from 'yup';

//Local File components.
import LoginNav from '../components/LoginNav'
import CurrentAuction from '../components/CurrentAuction';
import HomeProducts from '../components/HomeProducts';
import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';

//Firebase components.
import {loadDB} from '../lib/firebaseConfig';
let firebase = loadDB();
//Imports an authentication listeneer to check if a user is logged in.

/*Function: Login Formik
Purpose: Builds the manual login form*/
const LogInForm = () => {
    return (
        <Formik
        //Set initial values to empty
        initialValues={{
            email: '',
            password: ''
        }}

        //Validates email and passwords.
        validationSchema={
            Yup.object({
                email: Yup.string()
                .required('Please enter your email')
                .email('Invalid Email'),
                password: Yup.string()
                .required('Please enter password')
            })}

        //Submits data
        onSubmit={ async (values, {setSubmitting}) => {
            setSubmitting(true)
            //event.preventDefault()
            const email = values.email
            const pssw = values.password

            //Pulls Input data from post
            try {
                const response = await fetch('api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: pssw })
                });

                // If return response ok, then login with firebase backend.
                if(response.ok) {
                    firebase.auth().signInWithEmailAndPassword(email, pssw).catch(function(error) {
                        console.log(error)
                    alert('An Invalid Username or Password was entered.');
                    });
                    const {token} = await response.json();
//                       console.log('token from front end being called. Here is info from back end -- ' + token);

                        //Uses the authetication listener to redirect if user logs in sucessfully.
                        firebase.auth().onAuthStateChanged(function(user) {
                          if (user) {
                            // User is signed in.
                            window.location.href = "/home";
                          } else {
                            // No user is signed in.
                            console.log('A Firebase error has occured when signing in.');
                          }
                        });
                    }

                //If response was not okay.
                else {
                    console.log( response + "response not ok");
                }

            //Other error catching.
            } catch(error) {
                console.error('yout code sucks');
                throw new Error(error);
            }
        }}

        //Build the login form with formik.
        >

        {formik => (
            <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input name="email" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>) : null}
                <label htmlFor="password">Password</label>
                <input name="password" type="password" autoComplete="off" {...formik.getFieldProps('password')} />

            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>) : null}

            <button type="submit">Log In</button>
            </form>
        )}
        </Formik>
    );
};

/*Class:: Login
Function: Builds the Google Sign-in and Overall Sign-out*/
class Login extends React.Component {

    //Handle the sign-in portion.
    handleSignIn = () => {

    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithPopup(provider).then(function(authData) {
    	console.log(authData);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                window.location.href = "/home";

            } else {
                // No user is signed in.
            }
        });
    }).catch(function(error) {
    	console.log(error);
    });

}

//Render Content
render() {
    return (
        <div>
        <Link href="/index">
        <a className="card">
        <h3></h3>
        </a>
        </Link>
        <div className="login-form">
        <div className="hero">
        <ImageHeader />
        <div className="login-form">
        <LogInForm />
        <div className="row">
        <Link href="/Home">
        <a className="card">
        </a>
        </Link>
        <Link href="/registration">
        <a className="card">
        <h3>Register</h3>
        </a>
        </Link>
        <button onClick={this.handleSignIn}>Sign In using google</button>

        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

}

export default Login
