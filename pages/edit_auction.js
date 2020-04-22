/*
File Name: edit_auction.js
Purpose: Displays all current auctions and allows them to be edited.
Document Created By: Team 1
*/
import HomeForbidden from '../components/HomeForbidden';
import AdminNav from '../components/AdminNav';
import { Formik} from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
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
import daysArr from '../utils/daySelect';
import months from '../utils/monthSelect';
import Alert from 'react-bootstrap/Alert';

import Router from 'next/router';   // RTA - update 14 April 2020


let db = loadDB();


//Handles the data displayed for popover events.
const popover = (
    <Popover id="popover-basic">
    <Popover.Title as="h3">Pick Up Time Limit</Popover.Title>
    <Popover.Content>
        Waiting period to choose next highest bidder if first winner does not pay for bid.
    </Popover.Content>
    </Popover>
);


//formatting for the popover events.
const InfoPopOver = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <HelpCircle size="20" color="white" className="icon-format"/>
    </OverlayTrigger>
);


/*
Function: EditForm
Purpose: Creates the form for an admin to edit auction information.
*/

const EditForm = (props) => {
    const [userMessage, setUserMessage] = useState(null);
    return(
        <div>
        {userMessage ? <Alert variant='danger'>{userMessage}</Alert> : ''}
        <Formik
        //Initial values are set to current information from database.
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
                pickUpInformation: props.data.pickUpInformation,

                auctionID: props.aucID,    // RTA: Provide auction event id to update operation
            }}

            //Builds the validation for entering information.
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

            //Submit the data to process.
            onSubmit={ async (values, { setSubmitting }) => {
                //setSubmitting(true);
                let start = new Date(values.startDate.month + ' ' + values.startDate.day + ' ' + values.startDate.year + ' ' + values.startTime + ' EST');
                let end = new Date(values.endDate.month + ' ' + values.endDate.day + ' ' + values.endDate.year  + ' ' + values.endTime + ' EST');

                  //Ensures product times do not overlap. If they do
                  //Inform the user that they need to adjust start/end times.
                    if(end.getTime() < start.getTime()) {
                        setUserMessage('End date must be greater than start date. Try again.');
                    }
                    else {
                        if(end.getTime() == start.getTime()) {
                            setUserMessage('End date must be greater than start date and not the same as start time. Try again.');
                        }

                        //Attempt to send data to API to process
                        else {
                            try {
                                // RTA: quick and dirty fix. Convert to api call?

                                // Precompile the data for saving
                                let eventData = {values: values};
                                let aucID = values.auctionID;
                                delete eventData.values.auctionID;
                                /*
                                // Attempt to update DB record
                                loadDB()
                                .firestore()
                                .doc("/AuctionEvent/" + aucID)
                                .set(eventData)
                                .then( (results) => {
                                    console.log("Update success");
                                    Router.push('/auctionconfirm')
                                    //Router.push('/auctioneditconfirm') // To do: different page.
                                })
                                .catch( (err) => {
                                    console.error("Update error: " + err);
                                })
                                */
                                let ref = loadDB()
                                .firestore()
                                .doc("/AuctionEvent/" + aucID);
                                return ref.update({
                                    values: values
                                }).then(function() {
                                    console.log("Document successfully updated!");
                                    Router.push('/auctioneditconfirm');
                                })
                                .catch(function(error) {
                                // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                });


                                //Handle unknown or unspeciifed errors.
                            } catch(error) {
                                console.error('Your code sucks');
                                setUserMessage('Something went wrong. Try again in 1 minute.');
                                throw new Error(error);
                            }
                        }
                    }

//The following code below is the design of the form. Due to fori, comments
//cannot be displayed below.
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
        </Formik></div>
    );
}


//Sets use states for page.
const Auction = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //console.log(props)

    //Render and build the page layout.
    return(
        <div>
            <Row className="space">
                <Col sm={9}>
                    <h3><span className="bold-text makeGold">Title{getCode(58)}</span> {props.data.title}</h3>
                </Col>
                <Col sm={3}>
                    <DeleteAuctionModal data={props.data} aucID={props.aucID}/>
                    <Button onClick={handleShow}>Edit Auction</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Auction Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <EditForm data={props.data}/> */} {/*RTA: push along auction event document id to db operation*/}
                            <EditForm data={props.data} aucID={props.aucID}/>
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
            }

        });
        return () => { unsubscribe() };
    }, [db, adminMessage] );

    const showActiveMessage = (id) => {
        if(id == props.data) {
            if(adminMessage)
                return <Alert className='space' variant='info'>{adminMessage}</Alert>
            else
                return
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
                                //setAdminMessage(null);
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

const DeleteAuctionModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let aucID = props.aucID;
    let aucName = props.data.title;

    return (
        <div>
            <Button variant="secondary" className="space" active onClick={handleShow}>Delete</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {aucName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete {aucName}? This will also delete ALL of this event's products. You cannot undo this action.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" active onClick={() => {
                        // get snapshot of all product documents within event collection
                        db.firestore()
                            .collection(`AuctionEvent/${aucID}/AuctionProduct`)
                            .get().then(function(querySnapshot) {
                                // delete all products in current event
                                querySnapshot.forEach(function(documentSnapshot) {
                                    documentSnapshot.ref.delete().then(function() {
                                        //console.log("Product successfully deleted!");
                                    }).catch(function(error) {
                                        console.error("Error removing document: ", error);
                                    });
                            });
                        });

                        // delete event collection
                        db.firestore()
                            .collection('AuctionEvent').doc(aucID)
                            .delete().then(function() {
                                //console.log("Event successfully deleted!");
                            }).catch(function(error) {
                                console.error("Error removing document: ", error);
                            });

                        handleClose();
                    }}>
                    Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const CurrentAuction = () => {
    const [auctionEventData, setAuctionEventData] = useState([]);
    const [activeEvent, setActiveEvent] = useState(null);

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
                        if(doc.get('isActive')) {
                            setActiveEvent(doc.id);
                        }
                    });
                    setAuctionEventData(arrAuctionData);


                }
            });
            return () => { unsubscribe() };
    }, [db, activeEvent] );

    if (auctionEventData && auctionEventData.length) {
        return (
            <div>
                {auctionEventData.map(function (event) {
                    return (
                        <ListGroup as="ul" key={event.id}>
                            <ListGroup.Item>
                                <h3>Auction: {event.values['title']}</h3>
                                {event.id == activeEvent ? <Alert variant='info'>Active Auction Event</Alert> : ''}
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

                                                <Auction data={event.values} aucID={event.id}/>
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

let EditAuction = () => {
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

    if(currentUserIsAdmin == "true") {
        return (
            <div className="edit-auction-body">
                <AdminNav />
                <Container fluid>
                    <h2 className="text-center mx-auto space text-header">Auction Events</h2>
                    <CurrentAuction />
                </Container>
                <Footer/>
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

export default EditAuction;
