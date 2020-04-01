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

const EditUserForm = (props) => {
console.log(props);
    return (
        props.data ?
        <>
        <Formik
            initialValues={{
                firstName: props.data.currentFirstName,
                lastName: props.data.currentLastName,
                phone: props.data.currentEmail
            }}
            validationSchema={
                Yup.object({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required'),
                    phone: Yup.string().required('Required')
                })}
                onSubmit={ async (values, {setSubmitting}) => {
                    console.log("submitted");
                    const fName = values.firstName;
                    const lName = values.lastName;
                    const phone = values.phone;

                    try {
                        // const response = await fetch('api/registration', {
                        //     method: 'POST',
                        //     headers: { 'Content-Type': 'application/json' },
                        //     body: JSON.stringify({ email: email, password: pssw, firstName: fName, lastName: lName, phone: phone, isAdmin: "false" })
                        // });
                        //
                        // if(response.ok) {
                        //     console.log('response ok');
                        //     const {token} = await response.json();
                        //     console.log('token from front end being called. Here is info from back end -- ' + token);
                        //         console.log('Email verification has been sent.');
                        //         Router.push('/login');
                        //         }
                        //
                        // else {
                        //     console.log( response + "response not ok");
                        //
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

const EditAccount = () => {
/*
    const [currentData, setCurrentData] = useState(
        () => {
            var data = {};
            firebase.auth().onAuthStateChanged((user) => {
                 firebase.firestore()
                     .collection("/Users")
                     .doc(user.uid)
                     .get()
                     .then((querySnapshot) => {
                         data = {
                             currentFirstName: querySnapshot.data().firstName,
                             currentLastName: querySnapshot.data().lastName,
                             currentPhone: querySnapshot.data().phone
                         };

                         console.log(currentData.currentFirstName);
                     });
             });
             return data;
             console.log(currentData.currentFirstName);
        }
    );
*/
/*
    setCurrentData({
        currentFirstName: "initial",
        currentLastName: "val",
        currentPhone: "here"
    });
*/
/*
    useEffect( () => {
        firebase.auth().onAuthStateChanged((user) => {
             firebase.firestore()
                 .collection("/Users")
                 .doc(user.uid)
                 .get()
                 .then((querySnapshot) => {
                     setCurrentData({
                         currentFirstName: querySnapshot.data().firstName,
                         currentLastName: querySnapshot.data().lastName,
                         currentPhone: querySnapshot.data().phone
                     });

                     console.log(currentData.currentFirstName);
                 });
         });
         console.log(currentData.currentFirstName);
    }, [firebase] );
*/
    const [currentUserData, setCurrentUserData] = useContext(DataContext);

    var data = [];
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
