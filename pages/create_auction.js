import { Formik} from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getCode} from '../utils/helperFunctions';
import AdminNav from '../components/AdminNav';
import SelectState from '../components/SelectStates';

import createAuctionEvent from './api/createAuctionQuery';

const CreateAuctionForm = () => {
    return(
        <Formik
            initialValues={{
                title: '',
                date: '',
                time: '',
                description: '',
                imageURL: '',
                location: {
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                paymentLimitTime: '',
                pickUpInformation: ''
            }}
            validationSchema={
                Yup.object({
                    title: Yup.string()
                        .required('Please enter auction title'),
                    date: Yup.string()
                        .required('Please enter auction date'),
                    time: Yup.string()
                        .required('Please enter auction time'),
                    description: Yup.string()
                        .required('Please enter auction description'),
                    imageURL: Yup.string()
                        .required('enter url'),
                    location: Yup.object().shape({
                        addressLine1: Yup.string().required('enter address'),
                        addressLine2: Yup.string().notRequired(),
                        city: Yup.string().required('enter city'),
                        state: Yup.string().required('enter state'),
                        zip: Yup.string().required('enter zip code').min(5, 'enter valid zip code number')
                    }),
                    paymentLimitTime: Yup.string().required('Enter payment waiting period in hours'),
                    pickUpInformation: Yup.string().required('Enter pickup information for all products in auction. This information can be overriden in the create products page.')

                })}
            
            
            //    onSubmit={(values) => {
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));

                createAuctionEvent(values)

                setSubmitting(false);
                }, 400);
            }}

        >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control name="title" {...formik.getFieldProps('title')} />
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="imageURL">Image URL</Form.Label>
                        <Form.Control name="imageURL" {...formik.getFieldProps('imageURL')} />
                        {formik.touched.imageURL && formik.errors.imageURL ? (
                        <div>{formik.errors.imageURL}</div>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="description">Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" {...formik.getFieldProps('description')} />
                            {formik.touched.description && formik.errors.description ? (
                                <div>{formik.errors.description}</div>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="date">Date</Form.Label>
                        <Form.Control name="date" {...formik.getFieldProps('date')} />
                        {formik.touched.date && formik.errors.date ? (
                        <div>{formik.errors.date}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="time">Time</Form.Label>
                        <Form.Control name="time" {...formik.getFieldProps('time')} />
                        {formik.touched.time && formik.errors.time ? (
                        <div>{formik.errors.time}</div>) : null}
                    </Col>
                </Row>
                
                <Form.Label htmlFor="location.addressLine1">Address</Form.Label>
                <Form.Control name="location.addressLine1" {...formik.getFieldProps('location.addressLine1')} />
                {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                        <div>{formik.errors.addressLine1}</div>) : null}

                <Form.Label htmlFor="location.addressLine2">Appartment{getCode(44)} suite{getCode(44)} etc{getCode(46)}</Form.Label>
                <Form.Control name="location.addressLine2" {...formik.getFieldProps('location.addressLine2')} />
                {formik.touched.addressLine2 && formik.errors.addressLine2 ? (
                        <div>{formik.errors.addressLine2}</div>) : null}

                <Form.Label htmlFor="location.city">City</Form.Label>
                <Form.Control name="location.city" {...formik.getFieldProps('location.city')} />
                {formik.touched.city && formik.errors.city ? (
                        <div>{formik.errors.city}</div>) : null}
                
                <Form.Label htmlFor="location.state">State</Form.Label>
                <SelectState/>
                {/**<Form.Control name="location.state" {...formik.getFieldProps('location.state')} />
                {formik.touched.state && formik.errors.state ? (
                        <div>{formik.errors.state}</div>) : null}
                 */}
                
                
                <Form.Label htmlFor="location.zip">Zip Code</Form.Label>
                <Form.Control name="location.zip" {...formik.getFieldProps('location.zip')} />
                {formik.touched.zip && formik.errors.zip ? (
                        <div>{formik.errors.zip}</div>) : null}
                <Row>
                    <Col>
                        <Form.Label htmlFor="paymentLimitTime">Payment Time Limit</Form.Label>
                        <Form.Control name="paymentLimitTime" {...formik.getFieldProps('paymentLimitTime')} />
                        {formik.touched.paymentLimitTime && formik.errors.paymentLimitTime ? (
                        <div>{formik.errors.paymentLimitTime}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="pickUpInformation">Pick Up Information</Form.Label>
                        <Form.Control name="pickUpInformation" {...formik.getFieldProps('pickUpInformation')} />
                        {formik.touched.pickUpInformation && formik.errors.pickUpInformation ? (
                        <div>{formik.errors.pickUpInformation}</div>) : null}
                    </Col>
                </Row>
                
                
                
                        
            </Form.Group>
            <Button variant="success" type="submit">Save</Button>
            </Form>
            )}
            

        </Formik>
    );
};

let CreateAuction = () =>
    <div className="auction-creation-body">
        <AdminNav />
        <Container>
            <h2>Create Auction Event</h2>
            <CreateAuctionForm />
        </Container>
        
    </div>;
export default CreateAuction;