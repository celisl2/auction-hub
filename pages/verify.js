import {getCode} from '../utils/helperFunctions';
import ImageHeader from '../components/ImageHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {loadDB} from '../lib/db';
let firebase = loadDB();
import "firebase/auth";
import Cookies from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link'

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
                })}

                onSubmit={ async (values, {setSubmitting}) => {
                setSubmitting(true)

                    const email = values.email

                    try {
                    firebase.auth().onAuthStateChanged(function(user) {
                        user.sendEmailVerification();
                        if (user.emailVerified) {
                          console.log('Email is verified');
                          return Router.push('/index');
                        }
                        console.log('Sent email verification');
                        Router.push('/login');
                        });

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
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>) : null}
                <button type="submit">Submit</button>
            </form>
        )}
        </Formik>
    );
};

let Recovery = () =>
    <div className="login-body">
        <Head>
            <title>Auction Hub</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link href="https://fonts.googleapis.com/css?family=Merriweather:400,700|Open+Sans:300,400|Oswald:300,400&display=swap" rel="stylesheet"></link>

        </Head>
        <ImageHeader />
        <div className="login-form">
            <LogInForm />
        </div>
        <div className="login-register">
            <p>Resend your verification email or return to login.{getCode(63)}</p>
            {/** need on click for the buttons below */}
            <Link href="/login">
            <a className="card">
            <h3>Login&rarr;</h3>
            </a></Link>
            <Link href="/registration">
            <a className="card">
            <h3>Register&rarr;</h3>
            </a></Link>
            <Link href="/registration">
            <a className="card">
            <h3>Admin Registration&rarr;</h3>
            </a></Link>
        </div>
    </div>;
export default Recovery;
