import AdminNav from '../components/AdminNav';
import { Formik} from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getCode} from '../utils/helperFunctions';
import SelectState from '../components/SelectStates';


const EditForm = () => {
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
                        .notRequired(),
                    date: Yup.string()
                        .notRequired(),
                    time: Yup.string()
                        .notRequired(),
                    description: Yup.string()
                        .notRequired(),
                    imageURL: Yup.string()
                        .notRequired(),
                    location: Yup.object().shape({
                        addressLine1: Yup.string().notRequired(),
                        addressLine2: Yup.string().notRequired(),
                        city: Yup.string().notRequired(),
                        state: Yup.string().notRequired(),
                        zip: Yup.string().min(5, 'enter valid zip code number')
                            .notRequired()
                    }),
                    paymentLimitTime: Yup.string().notRequired(),
                    pickUpInformation: Yup.string().notRequired()
                })}
            
            
            //    onSubmit={(values) => {
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));


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
}

const SampleAuction = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <h3>Title</h3>
            <Row>
                <Col><Image src="https://miro.medium.com/max/2834/0*f81bU2qWpP51WWWC.jpg" fluid/></Col>
                <Col>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum odio non sapien maximus rutrum. Nullam libero sem, condimentum a est eu, maximus dapibus felis. Phasellus sed dictum arcu. Morbi pharetra eros at neque consequat, malesuada rhoncus ligula auctor. Sed dapibus eget dui eget fringilla. Ut posuere eget nulla et gravida. Phasellus ultrices quis lectus sed efficitur. Etiam mollis turpis at porta mattis. Sed lectus lorem, mollis ac placerat id, luctus nec velit. Phasellus auctor vel neque at molestie.</p>
                    <p>3:00</p>
                    <p>01/20/2030</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>123 Main Street</p>
                    <p>Rock Hill</p>
                </Col>
                <Col>
                    <p>SC</p>
                    <p>29733</p>
                </Col>
            </Row>
            <Row>
                <Col><p>Time limit -> 48 hours</p></Col>
                <Col><p>Pick up -> at 6pm behind the bathroom</p></Col>
            </Row>
            <Button onClick={handleShow}>Edit</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Auction Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm />
                </Modal.Body>

            </Modal>
        </div>
    );
};


let EditAuction = () =>
    <div className="edit-auction-body">
    <AdminNav />
    <Container>
        <h2>Edit Auction Event</h2>
        <SampleAuction />
    </Container>
        
    </div>;

export default EditAuction;
