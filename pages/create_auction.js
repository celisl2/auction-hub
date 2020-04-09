import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {HelpCircle} from 'react-feather';
import Footer from '../components/Footer';
import Alert from 'react-bootstrap/Alert';
import Router from 'next/router';
import {getCode} from '../utils/helperFunctions';
import AdminNav from '../components/AdminNav';
import React, { useState, useEffect } from 'react';
import HomeForbidden from '../components/HomeForbidden';
import daysArr from '../utils/daySelect';
import months from '../utils/monthSelect';
import Required from '../components/Required';
import { loadDB } from '../lib/db';
let firebase = loadDB();

const popover = (
    <Popover id="popover-basic">
    <Popover.Title as="h3">Pick Up Time Limit</Popover.Title>
    <Popover.Content>
        Waiting period to choose next highest bidder if first winner does not pay for bid.
    </Popover.Content>
    </Popover>
);

const InfoPopOver = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <HelpCircle size="20" color="white" className="icon-format"/>
    </OverlayTrigger>
);

const CreateAuctionForm = () => {

    return(
        <Formik
            initialValues={{
                title: '',
                startDate: {
                    day: '',
                    month: '',
                    year: ''
                },
                endDate: {
                    day: '',
                    month: '',
                    year: ''
                },
                startTime: '',
                endTime: '',
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
                    startDate: Yup.object().shape({
                        day: Yup.string().required("Please select a day"),
                        month: Yup.string().required("Please select a month"),
                        year: Yup.number().typeError('Year must be a number greater than or equal to the current year').min(new Date().getFullYear()).required("Please enter a valid year")
                    }),
                    endDate: Yup.object().shape({
                        day: Yup.string().required("Please select a day"),
                        month: Yup.string().required("Please select a month"),
                        year: Yup.number().typeError('Year must be a number greater than or equal to the current year').min(new Date().getFullYear()).required("Please enter a valid year")
                    }),
                    startTime: Yup.string()
                        .required('Please enter auction start time'),
                    endTime: Yup.string()
                        .required('Please enter time when auction event will end'),
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
            onSubmit={ async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                        const response = await fetch('api/createAuctionQuery', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({values})
                        });

                        if(response.ok) {
                            console.log('response ok');
                            const {token} = await response.json();
                            console.log('token from front end being called. Here is info from back end -- ' + token);
                            }

                        else {
                            console.log( response + "response not ok");
                        }
                    } catch(error) {
                        console.error('Your code sucks');
                        throw new Error(error);
                    }
                    Router.push('/auctionconfirm');

            }}
        >
            {formik => (
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label htmlFor="title">Title<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="title" {...formik.getFieldProps('title')} />
                        {formik.touched.title && formik.errors.title ? (
                            <Alert variant="danger">{formik.errors.title}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="imageURL">Image URL<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="imageURL" {...formik.getFieldProps('imageURL')} />
                        {formik.touched.imageURL && formik.errors.imageURL ? (
                        <Alert variant="danger">{formik.errors.imageURL}</Alert>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="description">Description<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" {...formik.getFieldProps('description')} />
                            {formik.touched.description && formik.errors.description ? (
                                <Alert variant="danger">{formik.errors.description}</Alert>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="startDate">Start Date<span className="req">{'*'}</span></Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="startDate.day">Day<span className="req">{'*'}</span></Form.Label>
                        <Form.Control as="select" name="startDate.day" {...formik.getFieldProps('startDate.day')}>
                            {daysArr.map((num) =>
                                <option key={num.label.toString()} value={num.label.toString()}>{num.value}</option>
                            )}
                        </Form.Control>
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <Alert variant="danger">{formik.errors.startDate.day}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="startDate.month">Month<span className="req">{'*'}</span></Form.Label>
                        <Form.Control as="select" name="startDate.month" {...formik.getFieldProps('startDate.month')}>
                            {months.map((val) =>
                                <option key={val.label.toString()} value={val.label.toString()}>{val.value}</option>
                            )}
                        </Form.Control>
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <Alert variant="danger">{formik.errors.startDate.month}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="startDate.year">Year<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="startDate.year" {...formik.getFieldProps('startDate.year')} />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <Alert variant="danger">{formik.errors.startDate.year}</Alert>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Alert variant="info" className="space">
                            Please enter an end date or end time to be greater than the start date and start time.
                        </Alert>
                        <Form.Label htmlFor="startDate">End Date<span className="req">{'*'}</span></Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="endDate.day">Day<span className="req">{'*'}</span></Form.Label>
                        <Form.Control as="select" name="endDate.day" {...formik.getFieldProps('endDate.day')} >
                            {daysArr.map((num) =>
                                <option key={num.label.toString()} value={num.label.toString()}>{num.value}</option>
                            )}
                        </Form.Control>
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <Alert variant="danger">{formik.errors.endDate.day}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="endDate.month">Month<span className="req">{'*'}</span></Form.Label>
                        <Form.Control as="select" name="endDate.month" {...formik.getFieldProps('endDate.month')}>
                            {months.map((val) =>
                                <option key={val.label.toString()} value={val.label.toString()}>{val.value}</option>
                            )}
                        </Form.Control>
                        {formik.touched.endDate && formik.errors.startDate ? (
                            <Alert variant="danger">{formik.errors.endDate.month}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="endDate.year">Year<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="endDate.year" {...formik.getFieldProps('endDate.year')} />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <Alert variant="danger">{formik.errors.endDate.year}</Alert>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="startTime">Start Time<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="startTime" {...formik.getFieldProps('startTime')} type="time"/>
                        {formik.touched.startTime && formik.errors.startTime ? (
                        <Alert variant="danger">{formik.errors.startTime}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="endTime">End Time<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="endTime" {...formik.getFieldProps('endTime')} type="time"/>
                        {formik.touched.endTime && formik.errors.endTime ? (
                        <Alert variant="danger">{formik.errors.endTime}</Alert>) : null}
                    </Col>
                </Row>


                <Form.Label htmlFor="location.addressLine1">Address<span className="req">{'*'}</span></Form.Label>
                <Form.Control name="location.addressLine1" {...formik.getFieldProps('location.addressLine1')} />
                {formik.touched.location && formik.errors.location ? (
                        <Alert variant="danger">{formik.errors.location.addressLine1}</Alert>) : null}

                <Form.Label htmlFor="location.addressLine2">Appartment{getCode(44)} suite{getCode(44)} etc{getCode(46)}</Form.Label>
                <Form.Control name="location.addressLine2" {...formik.getFieldProps('location.addressLine2')} />
               

                <Form.Label htmlFor="location.city">City<span className="req">{'*'}</span></Form.Label>
                <Form.Control name="location.city" {...formik.getFieldProps('location.city')} />
                {formik.touched.location && formik.errors.location ? (
                        <Alert variant="danger">{formik.errors.location.city}</Alert>) : null}

                <Form.Label htmlFor="location.state">State<span className="req">{'*'}</span></Form.Label>
                <Form.Control name="location.state" {...formik.getFieldProps('location.state')} />
                {formik.touched.location && formik.errors.location ? (
                        <Alert variant="danger">{formik.errors.location.state}</Alert>) : null}
                <Form.Label htmlFor="location.zip">Zip Code<span className="req">{'*'}</span></Form.Label>
                <Form.Control name="location.zip" {...formik.getFieldProps('location.zip')} />
                {formik.touched.location && formik.errors.location ? (
                        <Alert variant="danger">{formik.errors.location.zip}</Alert>) : null}
                <Row>
                    <Col>
                        <Form.Label htmlFor="paymentLimitTime">Payment Time Limit<span className="req">{'*'}</span></Form.Label>
                        <InfoPopOver />
                        <Form.Control as="select" name="paymentLimitTime" {...formik.getFieldProps('paymentLimitTime')}>
                            <option></option>
                            <option value="24">24 Hours</option>
                            <option value="48">48 Hours</option>
                            <option value="72">72 Hours</option>
                        </Form.Control>
                        {formik.touched.paymentLimitTime && formik.errors.paymentLimitTime ? (
                        <Alert variant="danger">{formik.errors.paymentLimitTime}</Alert>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="pickUpInformation">Pick Up Information<span className="req">{'*'}</span></Form.Label>
                        <Form.Control name="pickUpInformation" {...formik.getFieldProps('pickUpInformation')} />
                        {formik.touched.pickUpInformation && formik.errors.pickUpInformation ? (
                        <Alert variant="danger">{formik.errors.pickUpInformation}</Alert>) : null}
                    </Col>
                </Row>
            </Form.Group>
            <Button variant="success" type="submit">Save</Button>

            </Form>
            )}
        </Formik>
    );
};

let CreateAuction = () => {
    const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState([]);
    useEffect( () => {
        firebase.auth().onAuthStateChanged((user) => {
            const unsubscribe = firebase
                .firestore()
                .collection("/Users")
                .doc(user.uid)
                .get()
                .then((querySnapshot) => {
                    setCurrentUserIsAdmin(querySnapshot.data().isAdmin);
               });
        });
    }, [firebase] );

    if(currentUserIsAdmin == "true") {
        return (
            <div className="auction-creation-body">
                <AdminNav />
                <Container>
                    <h2 className="text-center mx-auto space text-header">Create Auction Event</h2>
                    <Alert variant="primary">
                        Creating an auction event will not make it visible to customers. To make an event active please visit the <Alert.Link href="/edit_auction"> edit auction page</Alert.Link>
                    </Alert>
                    <Required />
                    <CreateAuctionForm />
                </Container>
                <Footer />
                <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
            </div>
        );
    } else if(currentUserIsAdmin == "false") {
        return (
            <HomeForbidden />
        );
    } else {
        return null;
    }

}
export default CreateAuction;
