import AdminNav from '../components/AdminNav';
import {getCode} from '../utils/helperFunctions';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Footer from '../components/Footer';
import {loadDB} from '../lib/db';
import ProductsList from '../components/ProductsList';

let db = loadDB();



const EditProductForm = () => {
    return (
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
                productName: Yup.string().notRequired(),
                productDescription: Yup.string().notRequired(),
                productImageURL: Yup.string().notRequired(),
                minBid: Yup.number().notRequired(),
                maxBid: Yup.number().required('Please enter max bid'),
                productPickUpInfo: Yup.string().notRequired()
            })}


        onSubmit={(values, { setSubmitting }) => {


            /**
                Add logic of what to do when they submit
             */

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
    </Formik>
    );
};

let EditProducts = () => {
    const [auctionID, setAuctionId] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect( () => {
        const unsubscribe = db
            .firestore()
            .collection('AuctionEvent')
            .where('isActive', '==', true)
            .onSnapshot( (snapshot) => {
                console.log(snapshot)
                setAuctionId(snapshot.docs[0].id);
            });
            return () => { unsubscribe() };
    }, [db] );


    return (
        <div className="edit-auction-body">
            <AdminNav />
            <Container>
                <h2 className="text-center mx-auto space text-header">Edit Auction Products</h2>
            </Container>
            <Row>
                <Col><h3 className="flag-title">Products for Active Auction</h3></Col>
                <Col md={3}>
                {show ? <Button variant='secondary' onClick={handleClose}>Close</Button> : <Button variant='info' onClick={handleShow}>Expand</Button>}

                </Col>
            </Row>
                {show ? (
                    <>
                    {auctionID ? <ProductsList user="admin" props={auctionID}/> : <p>loading</p>}
                    </>
                ): (
                    <>
                        <p></p>
                    </>
                )}


            <Footer/>
            <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        </div>
    );
}


export default EditProducts;
