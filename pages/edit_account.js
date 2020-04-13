/*

File Name: edit_account.js
Purpose: A work in progress for editing account information for a user.
Document Created By: Team 1

*/

import ImageHeader from '../components/ImageHeader';
import {getCode} from '../utils/helperFunctions';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Footer from '../components/Footer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import editUser from './api/editUser';
import React, { useEffect, useState, useContext } from 'react';
import { loadDB } from './../lib/db';
let firebase = loadDB();

const DataContext = React.createContext([]);

/*
Function: EditUserForm
Purpose: Creates the form for a user to edit their information.
*/
const EditUserForm = (props) => {
console.log(props);
    return (
        props.data ?
        <>
        <Formik

        //Build the form.
            initialValues={{
                firstName: props.data.currentFirstName,
                lastName: props.data.currentLastName,
                phone: props.data.currentEmail
            }}

            //Builds the validation for entering information.
            validationSchema={
                Yup.object({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required'),
                    phone: Yup.string().required('Required')
                })}

                //Submit the data to process.
                onSubmit={ async (values, {setSubmitting}) => {
                    console.log("submitted");
                    const fName = values.firstName;
                    const lName = values.lastName;
                    const phone = values.phone;


                    //Attempt to process firebase command.
                    try {
                        firebase.auth().onAuthStateChanged((user) => {
                            firebase.firestore()
                                .collection("/Users")
                                .doc(user.uid)
                                .get()
                                .then((querySnapshot) => {
                                    editUser(user.uid, {
                                        email: querySnapshot.data().email,
                                        firstName: fName,
                                        lastName: lName,
                                        phone: phone,
                                        isAdmin: querySnapshot.data().isAdmin
                                    });
                                });
                        });

                    //If an error occurs throw it in the console.
                    } catch(error) {
                        console.error('Your code sucks');
                        throw new Error(error);
                    }

            }}
        >
        {formik => (
            <Form onSubmit={formik.handleSubmit}>
            <p>{props.data.currentFirstName}</p>
                <Form.Group>
                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                    <Form.Control name="firstName" {...formik.getFieldProps('firstName')} />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div>{formik.errors.firstName}</div>) : null}

                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control name="lastName" {...formik.getFieldProps('lastName')} />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div>{formik.errors.lastName}</div>) : null}

                    <Form.Label htmlFor="phone">Phone</Form.Label>
                    <Form.Control name="phone" {...formik.getFieldProps('phone')} />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>) : null}

                        <div className="text-center space">
                           <button className="btn customer-button" type="submit">Submit</button>
                        </div>

                </Form.Group>

            </Form>
        )}

        </Formik>
    </>
    :
    <>
        <div>
            <h1>Loading Form...</h1>
        </div>
    </>
    );
};


//Render the form using the function
const EditAccount = () => {

    const [currentUserData, setCurrentUserData] = useContext(DataContext);

    var data = [];

    //Check if user is signed in then access their information from the database.
    firebase.auth().onAuthStateChanged((user) => {
         firebase.firestore()
             .collection("/Users")
             .doc(user.uid)
             .get()
             .then((querySnapshot) => {
                 setCurrentUserData({
                     currentFirstName: querySnapshot.data().firstName,
                     currentLastName: querySnapshot.data().lastName,
                     currentEmail: querySnapshot.data().email,
                     currentIsAdmin: querySnapshot.data().isAdmin
                 });

                 console.log(currentUserData.currentFirstName);
             });
     });
     return data;
     console.log(currentUserData.currentFirstName);

//Render the webpage..
     return (
         <DataContext.Provider value={[currentUserData, setCurrentUserData]}>
            <div className="edit-account-body">
                <ImageHeader />
                <Container>
                    <div className="edit-account-content">
                        <h2 className="text-center mx-auto text-header">Edit Account</h2>
                        <EditUserForm data={currentUserData}/>
                    </div>
                </Container>
                <Footer />
                <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
            </div>
        </DataContext.Provider>
    );
}
export default EditAccount;
