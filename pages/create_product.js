// To do: properly await function completion in order to properly report to user.

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

import createAuctionProduct from './api/createProductQuery';


const CreateProductForm = () => {
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
                    productName: Yup.string().required('Please enter product name'),
                    productDescription: Yup.string().notRequired(),
                    productImageURL: Yup.string().required('Please enter the product\'s image URL'),
                    minBid: Yup.number().required('Please enter minimum bid'),
                    maxBid: Yup.number().required('Please enter max bid'),
                    productPickUpInfo: Yup.string().notRequired()
                })}


            onSubmit={(values, { setSubmitting }) => {
            
                alert(JSON.stringify(values, null, 2));

                createAuctionEvent(values)
                    .then( (results) => {
                        alert("INDEX.JS: Auction event created successfully!");
                    })
                    .catch( (error) => {
                        alert("INDEX.JS: There was a problem creating an auction event:\n\t" +
                        error.code + " : " + error.message + "\n");
                    })

                setSubmitting(false);
                
            }}
            //    onSubmit={(values) => {
            onSubmit= {(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));

                //createAuctionProduct(values)
                let creationSuccess = createAuctionProduct("Wko55XKmmKJnzfhjLJp3", values);
                // To do: properly await function completion in order to properly report to user.
                /*
                console.log("Doc ID: " + creationSuccess.toString());
                if(creationSuccess) {
                    console.log("Success!");
                }
                else {
                    console.log("Unsuccessful!");
                }
                */

                setSubmitting(false);
                }, 400);
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
}

//TODO: create another button for adding another product

const CreateProduct = () => 
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

export default CreateProduct;