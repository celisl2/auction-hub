import AdminNav from '../components/AdminNav';
import { Formik} from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {HelpCircle} from 'react-feather';
import {getCode} from '../utils/helperFunctions';
import Footer from '../components/Footer';
import {loadDB} from './../lib/db';
import ListGroup from 'react-bootstrap/ListGroup';
import Acordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import {deActivateEvent, activateEvent} from '../lib/activeEvent';

let db = loadDB();



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

const EditForm = (props) => {
    return(
        <Formik
            initialValues={{
                title: props.data.title,
                startDate: {
                    day: props.data.startDate.day,
                    month: props.data.startDate.month,
                    year: props.data.startDate.year
                },
                endDate: {
                    day: props.data.endDate.day,
                    month: props.data.endDate.month,
                    year: props.data.endDate.year
                },
                startTime: props.data.startTime,
                endTime: props.data.endTime,
                description: props.data.description,
                imageURL: props.data.imageURL,
                location: {
                    addressLine1: props.data.location.addressLine1,
                    addressLine2: props.data.location.addressLine2,
                    city: props.data.location.city,
                    state: props.data.location.state,
                    zip: props.data.location.zip
                },
                paymentLimitTime: props.data.paymentLimitTime,
                pickUpInformation: props.data.pickUpInformation
            }}
            validationSchema={
                Yup.object({
                    title: Yup.string()
                        .notRequired(),
                    startDate: Yup.object().shape({
                        day: Yup.number().typeError('Day must be a number between 1 and 31').min(1).max(31).notRequired(),
                        month: Yup.number().typeError('Month must be a number between 1 and 12').min(1).max(12).notRequired(),
                        year: Yup.number().typeError('Year must be a number greater than or equal to the current year').min(new Date().getFullYear()).notRequired(),
                    }),
                    endDate: Yup.object().shape({
                        day: Yup.number().typeError('Day must be a number between 1 and 31').min(1).max(31).notRequired(),
                        month: Yup.number().typeError('Month must be a number between 1 and 12').min(1).max(12).notRequired(),
                        year: Yup.number().typeError('Year must be a number greater than or equal to the current year').min(new Date().getFullYear()).notRequired(),
                    }),
                    startTime: Yup.string()
                        .notRequired(),
                    endTime: Yup.string()
                        .notRequired(),
                    description: Yup.string()
                        .notRequired(),
                    imageURL: Yup.string()
                        .required('enter url'),
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
}

const Auction = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(props)
    return(
        <div>
            <Row className="space">
                <Col sm={9}>
                    <h3><span className="bold-text makeGold">Title{getCode(58)}</span> {props.data.title}</h3>
                </Col>
                <Col sm={3}>
                    <Button onClick={handleShow}>Edit Auction</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Auction Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditForm data={props.data}/>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={6}><Image src={props.data.imageURL} fluid/></Col>
                <Col xs={12} sm={6}>
                    <p><span className="bold-text makeGold">Description{getCode(58)}</span> {props.data.description}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={6}>
                    <p><span className="bold-text makeGold">Start Time{getCode(58)}</span> {props.data.startTime}</p>
                    <p><span className="bold-text makeGold">Start Date{getCode(58)}</span> {props.data.startDate.month + "/" + props.data.startDate.day + "/" + props.data.startDate.year}</p>
                </Col>
                <Col xs={12} sm={6}>
                    <p><span className="bold-text makeGold">End Time{getCode(58)}</span> {props.data.endTime}</p>
                    <p><span className="bold-text makeGold">Start Date{getCode(58)}</span> {props.data.endDate.month + "/" + props.data.endDate.day + "/" + props.data.endDate.year}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={6}>
                    <p><span className="bold-text makeGold">Location{getCode(58)}</span> </p>
                    <p>{props.data.location.addressLine1}</p>
                    {props.data.location.addressLine2 ? <p>{props.data.location.addressLine2}</p> : ""}
                    <p>{props.data.location.city + ", " + props.data.location.state}</p>
                    <p>{props.data.location.zip}</p>
                </Col>
                <Col xs={12} sm={6}>
                    <p><span className="bold-text makeGold">Time Limit{getCode(58)}</span> {props.data.paymentLimitTime} hours</p>
                    <p><span className="bold-text makeGold">Pick Up Information{getCode(58)}</span> {props.data.pickUpInformation}</p>
                </Col>
            </Row>
            
        </div>
    );
};

//props = id of current event
const ActiveAuctionButton = (props) => {
    const [adminMessage, setAdminMessage] = useState(null);
    const [activeID, setActiveID] = useState(null);

    useEffect(() => {
        const unsubscribe = db
        .firestore()
        .collection('/AuctionEvent').doc(props.data)
        .onSnapshot( (snapshot) => {
            if(snapshot.get('isActive')) {
                setActiveID(props.data);
                setAdminMessage('Auction event active');
            }
                
        });
        return () => { unsubscribe() };
    }, [db] ); 

    const showActiveMessage = (id) => {
        if(id == props.data) {
            return <p>{adminMessage}</p>
        }
    };

    return  (
        <div>
            <Button variant="warning" active onClick={ () => {
            //check if any auction event is already active
            db.firestore().collection('AuctionEvent').where('isActive', '==', true)
                .get()
                .then(function(querySnapshot) {
                    //no auction events are active
                    if(querySnapshot.empty) {
                        //set current auction event as active
                        activateEvent(props.data);
                    }
                    //at least one auction event is active
                    else {
                        //one event is active
                        if(querySnapshot.size) {
                            console.log("one doc found " + querySnapshot.docs[0].id);
                            //the already active event is the one the admin is trying to activate
                            if(querySnapshot.docs[0].id == props.data) {
                                setAdminMessage('Auction event is already active!');
                            } else {
                                //unset old event and set new event as active
                                deActivateEvent(querySnapshot.docs[0].id);
                                activateEvent(props.data);
                            }
                        }
                        //more than one event is active
                        else {
                            //deactivate all active events
                            querySnapshot.forEach((doc) => {
                                deActivateEvent(doc.id);
                            });
                            //activate event wanted to be active
                            activateEvent(props.data);
                        }
                    }
                })
                .catch((error) => {
                    console.log('error in getting documents: ' + error)
                })
            }}>
                Activate Event
            </Button>
            {showActiveMessage(activeID)}
        </div>
        
    )
}

const RTCurrentAuction = () => {
    const [auctionEventData, setAuctionEventData] = useState([]);

    useEffect( () => {
        console.log("Attempt Update");
        const unsubscribe = db
            .firestore()
            .collection('/AuctionEvent')
            .onSnapshot( (snapshot) => {
                if (snapshot.size) {
                    let arrAuctionData = [];
                    snapshot.forEach( (doc) => {
                        arrAuctionData.push({id: doc.id, ...doc.data()});
                    });
                    setAuctionEventData(arrAuctionData);
                
                }
            });
            return () => { unsubscribe() };
    }, [db] ); 

    if (auctionEventData && auctionEventData.length) {
        return (
            <div>
                {auctionEventData.map(function (event) {
                    { /*console.log("Event " + event.id + " => " + JSON.stringify(event, null, 4)) console.log("has data prop");*/}
                    return (
                        <ListGroup as="ul" key={event.id}>
                            {console.log(event.data)}
                            <ListGroup.Item>
                                <h3>Auction: {event.values['title']}</h3>
                                <Acordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={event.id}>
                                                See {getCode(38)} Edit Auction Details
                                                
                                            </Accordion.Toggle>
                                            <ActiveAuctionButton data={event.id}/>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={event.id}>
                                            <Card.Body>
                                                <Auction data={event.values}/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Acordion>
                            </ListGroup.Item>
                        </ListGroup>
                    )
                })}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Loading Auction Data For You...</h1>
            </div>
        )
    }
};

let EditAuction = () =>
    <div className="edit-auction-body">
        <AdminNav />
        <Container fluid>
            <h2 className="text-center mx-auto space text-header">Auction Events</h2>
            <RTCurrentAuction />
        </Container>
        <Footer/>
        <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
    </div>;

export default EditAuction;