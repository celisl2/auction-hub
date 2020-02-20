/*
Name: Andy Estes
Group: Team 1
File: registration.js
Purpose: Handles the registration form and signup for the auction application
using Google Firebase to handle the registration.
*/

//Formik and Yup Components
import { Formik } from 'formik';
import * as Yup from 'yup';

//Local File components
import ImageHeader from '../components/ImageHeader';
import {loadDB} from '../lib/firebaseConfig';
let firebase = loadDB();

//Imports an authentication listener to check if a user is logged in.

/*Function: Login Formik
Builds the customer registration form.*/
const CustomerRegistration = () => {
    return (
        //Initilize Formik
        <Formik

            //Initiliaize initial values for form.
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirm: '',
            }}

            //Validation for form to prevent bad input.
            validationSchema={
                Yup.object({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid email address')
                        .required('Required'),
                    phone: Yup.string().required('Required'),
                    password: Yup.string().required('Required'),
                    passwordConfirm: Yup.string().required('Required')
                        .oneOf([Yup.ref('password')], 'Passwords do not match')
                })}

            //Command to handle upon submitting the form.
            onSubmit={(values, { setSubmitting }) => {
                const {email, password } = values;
                // Simulate a mouse click:

                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    //Firebase errors are handled here.
                       console.log(error);
                });

                firebase.auth().onAuthStateChanged(user => {
                    if(user) {
                        //After successful creation, user will be redirected to home.html
                        window.location = '/indexAuth';
                    }
                });
            }}
        >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" {...formik.getFieldProps('firstName')} />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>) : null}

                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" {...formik.getFieldProps('lastName')} />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>) : null}

                <label htmlFor="email">Email Address</label>
                <input name="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>) : null}

                <label htmlFor="phone">Phone</label>
                <input name="phone" {...formik.getFieldProps('phone')} />
                {formik.touched.phone && formik.errors.phone ? (
                    <div>{formik.errors.phone}</div>) : null}

                <label htmlFor="password">Password</label>
                <input name="password" {...formik.getFieldProps('password')} />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                />
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div>{formik.errors.passwordConfirm}</div>) : null}
                <button type="submit">Register</button>
            </form>
        )}

        </Formik>
    );
};

const AdminRegistration = () => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirm: '',
            }}
            validationSchema={
                Yup.object({
                    firstName: Yup.string()
                .required('Required'),
                lastName: Yup.string()
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .required('Required'),
                passwordConfirm: Yup.string()
                    .required('Required')
                    .oneOf([Yup.ref('password')], 'Passwords do not match')
                })}
            onSubmit={(values, { setSubmitting }) => {

        /*        setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
*/
            }}
        >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" {...formik.getFieldProps('firstName')} />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>) : null}
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" {...formik.getFieldProps('lastName')} />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>) : null}
                <label htmlFor="email">Email Address</label>
                <input name="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>) : null}
                <label htmlFor="password">Password</label>
                <input name="password" {...formik.getFieldProps('password')} />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                />
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div>{formik.errors.passwordConfirm}</div>) : null}
                <button type="submit">Register</button>
            </form>
        )}

        </Formik>
    );
};

const Registration = () =>
    <div className="registration-body">
        <ImageHeader />
        <div className="registration-content">
            <h2>Register</h2>
            <CustomerRegistration />
            {/* will need to either separate admin registration to other file or
                use logic to to only display admin when clicking on the admin link
             */}
            <hr />
            <AdminRegistration />
        </div>
    </div>;
export default Registration;
