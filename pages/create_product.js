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

const db = loadDB();

import createAuctionProduct from './api/createProductQuery';
let success = null;

const CreateProductForm = () => {
    return (
        <div>
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
                    minBid: Yup.number().required('Please enter minimum bid'),
                    maxBid: Yup.number().required('Please enter max bid'),
                    productPickUpInfo: Yup.string().notRequired()
                })}


            onSubmit={(values, { setSubmitting }) => {

              db.firestore().collection('AuctionEvent')
              .where('isActive', '==', true)
                  .get()
                  .then(function(querySnapshot) {
                      //If no events are active
                      if(querySnapshot.empty) {
                          //Alert user to activate an event.
                          console.log("Please Activate an event before Creating a product.");
                      }
                      //at least one auction event is active
                      else {

                          //one event is active
                          if(querySnapshot.size) {
                              console.log("one doc found " + querySnapshot.docs[0].id);

                              //Create event based on the currently active event.
                                let creationSuccess = createAuctionProduct(querySnapshot.docs[0].id, values);
                                console.log(creationSuccess + "*** in pages")
                               } else {
                                  //query snapshot will appear as undefined due to object parameters


                          }
                          //more than one event is active
                      }
                  })

            }}
        >

        {formik => (
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label htmlFor="productName">Product Name</Form.Label>
                        <Form.Control name="productName" {...formik.getFieldProps('productName')} />
                        {formik.touched.productName && formik.errors.productName ? (
                            <div>{formik.errors.productName}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="productImageURL">Image URL</Form.Label>
                        <Form.Control name="productImageURL" {...formik.getFieldProps('productImageURL')} />
                        {formik.touched.productImageURL && formik.errors.productImageURL ? (
                            <div>{formik.errors.productImageURL}</div>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="productDescription">Product Description</Form.Label>
                        <Form.Control name="productDescription" as="textarea" rows="2" {...formik.getFieldProps('productDescription')} />
                        {formik.touched.productDescription && formik.errors.productDescription ? (
                            <div>{formik.errors.productDescription}</div>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="minBid">Min Bid</Form.Label>
                        <Form.Control name="minBid" {...formik.getFieldProps('minBid')} />
                        {formik.touched.minBid && formik.errors.minBid ? (
                            <div>{formik.errors.minBid}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="maxBid">Max Bid</Form.Label>
                        <Form.Control name="maxBid" {...formik.getFieldProps('maxBid')} />
                        {formik.touched.maxBid && formik.errors.maxBid ? (
                            <div>{formik.errors.maxBid}</div>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="productPickUpInfo">Product Pick Up Information <span>{getCode(40)}optional{getCode(41)}</span></Form.Label>
                        <Form.Control name="productPickUpInfo" {...formik.getFieldProps('productPickUpInfo')} />
                        {formik.touched.productPickUpInfo && formik.errors.productPickUpInfo ? (
                            <div>{formik.errors.productPickUpInfo}</div>) : null}
                    </Col>
                </Row>
            </Form.Group>
            <Button variant="success" type="submit">Save</Button>
        </Form>
        )}
        {}
        </Formik></div>
    );
}

//TODO: create another button for adding another product

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
