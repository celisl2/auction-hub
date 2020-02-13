/*
Name: Andy Estes
Group: Team 1
File: Login.js
Function: Handles the login Portion of the application using Google Firebase API.
*/

//Import Resources From Local Storage
import React from 'react'
import Link from 'next/link'

import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Head from 'next/head';

//Firebase Imports
import { auth, firebase } from '../src/firebase'

/*Function: Login Formik
Purpose: Builds the manual login form*/
const LogInForm = () => {
    return (
        <Formik
        initialValues={{
            email: '',
            password: ''
        }}

        validationSchema={
            Yup.object({
                email: Yup.string()
                .required('Please enter your email')
                .email('Invalid Email'),
                password: Yup.string()
                .required('Please enter password')
            })}

        onSubmit={ async (values, {setSubmitting}) => {
            setSubmitting(true)
            //event.preventDefault()
            const email = values.email
            const pssw = values.password

            try {
                const response = await fetch('api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: pssw })
                });

                if(response.ok) {
                    firebase.auth().signInWithEmailAndPassword(email, pssw).catch(function(error) {
                        console.log(error)
                    });
                    const {token} = await response.json();
                        console.log('token from front end being called. Here is info from back end -- ' + token);
                    }

                else {
                    console.log( response + "response not ok");
                }
            } catch(error) {
                console.error('yout code sucks');
                throw new Error(error);
            }
        }}
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

    //Handles the sign-in portion.
    handleSignIn = () => {

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(authData) {
        console.log(authData);
        alert(signedin);

    }).catch(function(error) {
        console.log(error);
    });
}

//Handles the Sign-out Function.
handleLogout = () => {

    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }, function(error) {
        console.log(error);
    });
    window.location.href = "http://localhost:3000";
}

render() {
    return (
        <div>
        <div className="login-form">
        <div className="hero">
        <h1 className="title">Test Login Screen!</h1>
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
        <button onClick={this.handleLogout}>Logout</button>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

}

export default Login
