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
                        firebase.auth().sendPasswordResetEmail(email)
                            .then(() => {
                                console.log('Sent recovery password to email')
                                Router.push('/recoverysent');
                            })
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
                        <div className="text-center space"></div>
                        <button className="btn customer-button" type="submit">Submit</button>
            </form>
        )}
        </Formik>
    );
};

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
            <LogInForm />
        </div>
        <div className="login-register-recovery">
            <p className="login-special">Not registered yet{getCode(63)}</p>
            <div className='line'></div>
            {/** need on click for the buttons below */}
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
