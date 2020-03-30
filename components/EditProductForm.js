import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import {getCode} from '../utils/helperFunctions';
import Button from 'react-bootstrap/Button';
import {loadDB} from '../lib/db';
import {useState} from 'react';

let firebase = loadDB();

const EditProductForm = (props) => {
    //console.log(props)
    const [adminMessage, setAdminMessage] = useState(null);
    const [color, setColor] = useState(null);

    return (
        <div>
         
        {adminMessage ? <Alert variant={color}>{adminMessage}</Alert> : ''}
        <Formik
        initialValues={{
            productName: props.data.data.productName,
            productDescription: props.data.data.productDescription,
            productImageURL: props.data.data.productImageURL,
            minBid: props.data.data.minBid,
            maxBid: props.data.data.maxBid,
            productPickUpInfo: props.data.data.productPickUpInfo
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
            //props.data.auction
            let ref = firebase.firestore()
            .collection('AuctionEvent/' + props.data.auction + '/AuctionProduct/').doc(props.data.data.id);

            return ref.update({
                productName: values.productName,
                productDescription: values.productDescription,
                productImageURL: values.productImageURL,
                minBid: values.minBid,
                maxBid: values.maxBid,
                productPickUpInfo: values.productPickUpInfo
            
            }).then(() => {
                setAdminMessage('Product successfully updated');
                setColor('success');
            }).catch(function(error) {
                // The document probably doesn't exist.
                setAdminMessage('Could not update product. Please try again');
                setColor('danger');
                console.error("Error updating document: ", error);
            });
            
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
    </div>
    );
};

export default EditProductForm;