/*

File Name: create_product.js
Purpose: Builds the form for creating a product.
Document Created By: Team 1

*/

import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {getCode} from '../utils/helperFunctions';
import AdminNav from '../components/AdminNav';
import Footer from '../components/Footer';
import {loadDB} from '../lib/db';
import React, { useState, useEffect } from 'react';
import HomeForbidden from '../components/HomeForbidden';
import Required from '../components/Required';
import Router from 'next/router';
import Alert from 'react-bootstrap/Alert';

const db = loadDB();

import createAuctionProduct from './api/createProductQuery';

const CreateProductForm = () => {
    const [userMessage, setUserMessage] = useState(null);
    return (
        <div>
            {userMessage ? <Alert variant='danger'>{userMessage}</Alert> : ''}
        <Formik
            initialValues={{
                productName: '',
                productDescription: '',
                productImageURL: '',
                minBid: '',
                maxBid: '',
                productPickUpInfo: ''
            }}
            validationSchema={
                Yup.object({
                    productName: Yup.string().required('Please enter product name'),
                    productDescription: Yup.string().notRequired(),
                    productImageURL: Yup.string().required('Please enter the product\'s image URL'),
                    minBid: Yup.number().typeError('Min bid must be a number').positive('Number must be positive').integer('Minimum bid must be an integer').required('Please enter minimum bid'),
                    maxBid: Yup.number().typeError('Max bid must be a number').positive('Number must be positive').integer('Minimum bid must be an integer').required('Please enter max bid'),
                    productPickUpInfo: Yup.string().notRequired()
                })}


            onSubmit={(values, { setSubmitting }) => {
                if(Number(values.minBid) >= Number(values.maxBid)) {
                    setUserMessage('Max bid must be greater than min bid. Please try again.');
                }
                else {
                    db.firestore().collection('AuctionEvent')
                    .where('isActive', '==', true)
                        .get()
                        .then(function(querySnapshot) {
                            //If no events are active
                            if(querySnapshot.empty) {
                                //Alert user to activate an event.
                                setUserMessage('Please activate an event before creating a product.');
                            }
                            //at least one auction event is active
                            else {
                                //one event is active
                                if(querySnapshot.size) {
                                    console.log("one doc found " + querySnapshot.docs[0].id);
                                    //Create event based on the currently active event.
                                        let creationSuccess = createAuctionProduct(querySnapshot.docs[0].id, values);
                                        Router.push('/productconfirm');
                                    } else {
                                        //query snapshot will appear as undefined due to object parameters
                                }
                            }
                        })
                }
            }}
        >

        {formik => (
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label htmlFor="productName">Product Name<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="productName" {...formik.getFieldProps('productName')} />
                        {formik.touched.productName && formik.errors.productName ? (
                            <Alert variant='danger'>{formik.errors.productName}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="productImageURL">Image URL<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="productImageURL" {...formik.getFieldProps('productImageURL')} />
                        {formik.touched.productImageURL && formik.errors.productImageURL ? (
                            <Alert variant='danger'>{formik.errors.productImageURL}</Alert>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="productDescription">Product Description<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="productDescription" as="textarea" rows="2" {...formik.getFieldProps('productDescription')} />
                        {formik.touched.productDescription && formik.errors.productDescription ? (
                            <Alert variant='danger'>{formik.errors.productDescription}</Alert>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="minBid">Min Bid<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="minBid" {...formik.getFieldProps('minBid')} />
                        {formik.touched.minBid && formik.errors.minBid ? (
                            <Alert variant='danger'>{formik.errors.minBid}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="maxBid">Max Bid<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="maxBid" {...formik.getFieldProps('maxBid')} />
                        {formik.touched.maxBid && formik.errors.maxBid ? (
                            <Alert variant='danger'>{formik.errors.maxBid}</Alert>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="productPickUpInfo">Product Pick Up Information <span>{getCode(40)}optional{getCode(41)}</span></Form.Label>
                        <Form.Control name="productPickUpInfo" {...formik.getFieldProps('productPickUpInfo')} />
                    </Col>
                </Row>
            </Form.Group>
            <Button variant="success" type="submit">Save</Button>
        </Form>
        )}
        </Formik></div>
    );
}

const CreateProduct = () => {
    const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState([]);
    useEffect( () => {
        db.auth().onAuthStateChanged((user) => {
            const unsubscribe = db
                .firestore()
                .collection("/Users")
                .doc(user.uid)
                .get()
                .then((querySnapshot) => {
                    setCurrentUserIsAdmin(querySnapshot.data().isAdmin);
               });
        });
    }, [db] );

    if(currentUserIsAdmin == "true")
    {
        return (
            <div className="create-product-body">
                <AdminNav />
                <Container>
                    <h2 className="text-center mx-auto space text-header">Create Auction Product</h2>
                    <Alert variant='info'>Any product created will be automatically added to the current active event.</Alert>
                    <Required />
                    <CreateProductForm />
                </Container>
                <div className="footer-space"></div>
                <Footer />
                <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
            </div>
        );
    } else if (currentUserIsAdmin == "false") {
        return (
            <HomeForbidden />
        );
    } else {
        return null;
    }
}

export default CreateProduct;
