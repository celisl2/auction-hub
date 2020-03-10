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

import {getCode} from '../utils/helperFunctions';
import AdminNav from '../components/AdminNav';

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
                        day: Yup.number().typeError('Day must be a number between 1 and 31').min(1).max(31).required("Please enter a valid day"),
                        month: Yup.number().typeError('Month must be a number between 1 and 12').min(1).max(12).required("Please enter a valid month number"),
                        year: Yup.number().typeError('Year must be a number greater than or equal to the current year').min(new Date().getFullYear()).required("Please enter a valid year")
                    }),
                    endDate: Yup.object().shape({
                        day: Yup.number().typeError('Day must be a number between 1 and 31').min(1).max(31).required("Please enter a valid day"),
                        month: Yup.number().typeError('Month must be a number between 1 and 12').min(1).max(12).required("Please enter a valid month number"),
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
                        <Form.Label htmlFor="startDate">Start Date</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="startDate.day">Day</Form.Label>
                        <Form.Control name="startDate.day" {...formik.getFieldProps('startDate.day')} />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <div>{formik.errors.startDate.day}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="startDate.month">Month</Form.Label>
                        <Form.Control name="startDate.month" {...formik.getFieldProps('startDate.month')} />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <div>{formik.errors.startDate.month}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="startDate.year">Year</Form.Label>
                        <Form.Control name="startDate.year" {...formik.getFieldProps('startDate.year')} />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <div>{formik.errors.startDate.year}</div>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="startDate">End Date</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="endDate.day">Day</Form.Label>
                        <Form.Control name="endDate.day" {...formik.getFieldProps('endDate.day')} />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <div>{formik.errors.endDate.day}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="endDate.month">Month</Form.Label>
                        <Form.Control name="endDate.month" {...formik.getFieldProps('endDate.month')} />
                        {formik.touched.endDate && formik.errors.startDate ? (
                            <div>{formik.errors.endDate.month}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="endDate.year">Year</Form.Label>
                        <Form.Control name="endDate.year" {...formik.getFieldProps('endDate.year')} />
                        {formik.touched.endDate && formik.errors.endDate ? (
                            <div>{formik.errors.endDate.year}</div>) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label htmlFor="startTime">Start Time</Form.Label>
                        <Form.Control name="startTime" {...formik.getFieldProps('startTime')} type="time"/>
                        {formik.touched.startTime && formik.errors.startTime ? (
                        <div>{formik.errors.startTime}</div>) : null}
                    </Col>
                    <Col>
                        <Form.Label htmlFor="endTime">End Time</Form.Label>
                        <Form.Control name="endTime" {...formik.getFieldProps('endTime')} type="time"/>
                        {formik.touched.endTime && formik.errors.endTime ? (
                        <div>{formik.errors.endTime}</div>) : null}
                    </Col>
                </Row>

                
                <Form.Label htmlFor="location.addressLine1">Address</Form.Label>
                <Form.Control name="location.addressLine1" {...formik.getFieldProps('location.addressLine1')} />
                {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location.addressLine1}</div>) : null}

                <Form.Label htmlFor="location.addressLine2">Appartment{getCode(44)} suite{getCode(44)} etc{getCode(46)}</Form.Label>
                <Form.Control name="location.addressLine2" {...formik.getFieldProps('location.addressLine2')} />
                {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location.addressLine2}</div>) : null}

                <Form.Label htmlFor="location.city">City</Form.Label>
                <Form.Control name="location.city" {...formik.getFieldProps('location.city')} />
                {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location.city}</div>) : null}
                
                <Form.Label htmlFor="location.state">State</Form.Label>
                <Form.Control name="location.state" {...formik.getFieldProps('location.state')} />
                {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location.state}</div>) : null}
                <Form.Label htmlFor="location.zip">Zip Code</Form.Label>
                <Form.Control name="location.zip" {...formik.getFieldProps('location.zip')} />
                {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location.zip}</div>) : null}
                <Row>
                    <Col>
                        <Form.Label htmlFor="paymentLimitTime">Payment Time Limit</Form.Label>
                        {/**
                        <Form.Control name="paymentLimitTime" {...formik.getFieldProps('paymentLimitTime')} />
                        {formik.touched.paymentLimitTime && formik.errors.paymentLimitTime ? (
                        <div>{formik.errors.paymentLimitTime}</div>) : null}
                         */}
                         <InfoPopOver />
                        <Form.Control as="select" name="paymentLimitTime" {...formik.getFieldProps('paymentLimitTime')}>
                            <option></option>
                            <option value="24">24 Hours</option>
                            <option value="48">48 Hours</option>
                            <option value="72">72 Hours</option>
                        </Form.Control>
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