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
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer';

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

                    const email = values.email
                    const pssw = values.password

                    try {
                        firebase.auth().signInWithEmailAndPassword(email, pssw)
                            .then(() => {
                                console.log('logged in fine from firebase')
                                Router.push('/index');
                            })
                            .catch((error) => {
                                let errorCode = error.code;
                                    if(errorCode == 'invalid-email') {
                                        Cookies.set('logInError', 'Email address not valid');
                                    } else if(errorCode == 'user-disabled') {
                                        Cookies.set('logInError', 'Your account has been disabled. Please contact an adiministrator');
                                    } else if(errorCode == 'user-not-found') {
                                        Cookies.set('logInError', 'There is no account associated with this email. Please create an account or double check the email entered.');
                                    } else if( errorCode == 'wrong-password') {
                                        Cookies.set('logInError', 'Incorrect password. Please enter a valid passoword associated with that email.');
                                    } else {
                                        console.log(error);
                                    }
                            });

                    } catch(error) {
                        console.error('yout code sucks');
                        throw new Error(error);
                    }
            }}
        >
        {formik => (
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control className="login-input" type="email" placeholder="Enter email" name="email" {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>) : null}
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control className="login-input" type="password" placeholder="Password" name="password" autoComplete="off" {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>) : null}
                    <button className="btn btn-primary login-button" type="submit">Log In</button>
                </Form.Group>
            </Form>
            
        )}
        </Formik>
    );
};

let Login = () =>
    <div className="login-body">
        <Head>
            <title>Log In | Auction Hub</title>
        </Head>
        
            <ImageHeader />
            <Container>
                <h3 className="text-center mx-auto login-header">Log In</h3>
            <div className="mx-auto login-form">
                <LogInForm />
                <div className='line'></div>
                <Link href="/recovery">
                    <a className="card plain-link btn btn-secondary">Forgot Password</a>
                </Link>
            </div>
            <div className="login-register-recovery">
                <p className="login-special">Not registered yet{getCode(63)}</p>
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
export default Login;
