/*

File Name: recovery.js
Purpose: Displays the information needed to sent a password recovery.
Document Created By: Team 1

*/

import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import Container from 'react-bootstrap/Container';
import Footer from '../components/Footer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {loadDB} from '../lib/db';
let firebase = loadDB();
import "firebase/auth";
import Cookies from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link'


/*
Function: RecoveryForm
Purpose: Builds the form for a user to input an email address.
*/

const RecoveryForm = () => {
    return (
        <Formik
            initialValues={{
                email: '',
            }}

            //Builds the validation for entering an email address.
            validationSchema={
                Yup.object({
                    email: Yup.string()
                        .required('Please enter your email')
                        .email('Invalid Email'),
                })}

                //Submit the data to process.
                onSubmit={ async (values, {setSubmitting}) => {
                setSubmitting(true)

                    const email = values.email

                    try {
                      //Attempt Firebase command
                        firebase.auth().sendPasswordResetEmail(email)
                            .then(() => {
                              //Send to console and route user to confirmation.
                                console.log('Sent recovery password to email')
                                Router.push('/recoverysent');
                            })

                            //Handle Errors
                            .catch((error) => {
                                let errorCode = error.code;
                                    if(errorCode == 'invalid-email') {
                                        Cookies.set('logInError', 'Email address not valid');
                                    } else if(errorCode == 'user-disabled') {
                                        Cookies.set('logInError', 'Your account has been disabled. Please contact an adiministrator');
                                    } else if(errorCode == 'user-not-found') {
                                        Cookies.set('logInError', 'There is no account associated with this email. Please create an account or double check the email entered.');
                                    } else {
                                        console.log(error);
                                    }
                            });
                    //Throw error if above handling does not work.
                    } catch(error) {
                        console.error('An unknown error has occurred.');
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
                        <div className="text-center space"></div>
                        <button className="btn customer-button" type="submit">Submit</button>
            </form>
        )}
        </Formik>
    );
};

//Renders the page
let Recovery = () =>
<div className="login-body">
    <Head>
        <title>Log In | Auction Hub</title>
    </Head>

        <ImageHeader />
        <Container>
            <h3 className="text-center mx-auto login-header">Recover Password</h3>
        <div className="mx-auto login-form">
        <h5>Enter your email address below to send a recovery email to your specified address.</h5>
            <RecoveryForm />
        </div>
        <div className="login-register-recovery">
            <p className="login-special">Not registered yet{getCode(63)}</p>
            <div className='line'></div>
            {/* On click can be added as needed.*/}
            <Link href="/registration">
                <a className="card">Register</a>
            </Link>
            <Link href="/admin_registration">
                <a className="card">Administrator Registration</a>
            </Link>
        </div>
    </Container>
    <Footer />
    <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
</div>;
export default Recovery;
