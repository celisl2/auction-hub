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
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SampleProduct = () =>
    <div>
        <h3>Title</h3>
        <Image src="https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg"  fluid/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum odio non sapien maximus rutrum. Nullam libero sem, condimentum a est eu, maximus dapibus felis. Phasellus sed dictum arcu. Morbi pharetra eros at neque consequat, malesuada rhoncus ligula auctor. Sed dapibus eget dui eget fringilla. Ut posuere eget nulla et gravida. Phasellus ultrices quis lectus sed efficitur. Etiam mollis turpis at porta mattis. Sed lectus lorem, mollis ac placerat id, luctus nec velit. Phasellus auctor vel neque at molestie.</p>
        <strong>$300</strong>
        <p>Min bid-> 2</p>
        <p>Max bid -> 4</p>
        <p>Pick up info -> tomorrow in digs</p>
    </div>;

const EditProductsCards = () => {
    return (
        //Call function here to loop through the different products
        <CardDeck>
            <Card border='secondary'>
                <Card.Img variant='top' src="https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg" />
                <Card.Body>
                    <Card.Title>Product title here</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum odio non sapien maximus rutrum. Nullam libero sem, condimentum a est eu, maximus dapibus felis. Phasellus sed dictum arcu. Morbi pharetra eros at neque consequat, malesuada rhoncus ligula auctor. Sed dapibus eget dui eget fringilla. Ut posuere eget nulla et gravida. Phasellus ultrices quis lectus sed efficitur. Etiam mollis turpis at porta mattis. Sed lectus lorem, mollis ac placerat id, luctus nec velit. Phasellus auctor vel neque at molestie.</Card.Text>
                    <Button variant='info'>Edit Product</Button>
                </Card.Body>
            </Card>
            <Card border='secondary'>
                <Card.Img variant='top' src="https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg" />
                <Card.Body>
                    <Card.Title>Product title here</Card.Title>
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum odio non sapien maximus rutrum. Nullam libero sem, condimentum a est eu, maximus dapibus felis. Phasellus sed dictum arcu. Morbi pharetra eros at neque consequat, malesuada rhoncus ligula auctor. Sed dapibus eget dui eget fringilla. Ut posuere eget nulla et gravida. Phasellus ultrices quis lectus sed efficitur. Etiam mollis turpis at porta mattis. Sed lectus lorem, mollis ac placerat id, luctus nec velit. Phasellus auctor vel neque at molestie.</Card.Text>
                    <Button variant='info'>Edit Product</Button>
                </Card.Body>
            </Card>
        </CardDeck>
    )
}

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

const EditProductModal = () => {
    //when you call the dynamic created pages change this useState below to true
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button onClick={handleShow}>Edit</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit -product name here-</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProductForm />
                </Modal.Body>
            </Modal>
        </div>

    );
};

let EditProducts = () =>
    <div className="edit-auction-body">
        <AdminNav />
        <Container>
            <h2>Edit Auction Products</h2>
            <EditProductsCards />
            <h3>*** this button will go in the dynamic pages created ***</h3>
            <EditProductModal />
        </Container>
        
    </div>;

export default EditProducts;
