import {getCode} from '../utils/helperFunctions';
import CountdownTimer from '../components/Timer';
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Acordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Plus} from 'react-feather';

import {loadDB} from './../lib/db';
import Accordion from 'react-bootstrap/Accordion';

let db = loadDB();

function parseDates(startD, startT, endD, endT) {
    console.log("***" + startD)
    if(!startD) return null;
    let startDateWithTime = startD.year + " " + startD.month + " " + startD.day + " " + startT + " EST";
    let endDateWithTime = endD.year + " " + endD.month + " " + endD.day + " " + endT + " EST";

    return {
        startTime: startDateWithTime,
        endTime: endDateWithTime
    }
}

function parseData(dt) {
    if(dt.values) {
        return ({
            
            title: dt.values.title,
            description: dt.values.description,
            startDate: dt.values.startDate,
            startTime: dt.values.startTime,
            endDate: dt.values.endDate,
            endTime: dt.values.endTime,
            imageURL: dt.values.imageURL,
            location: dt.values.location,
            paymentLimitTime: dt.values.paymentLimitTime,
            pickUpInformation: dt.values.pickUpInformation,
            
        })
    } else {
        return ({
            
            title: dt.title,
            description: dt.description,
            startDate: dt.startDate,
            startTime: dt.startTime,
            endDate: dt.endDate,
            endTime: dt.endTime,
            imageURL: dt.imageURL,
            location: dt.location,
            paymentLimitTime: dt.paymentLimitTime,
            pickUpInformation: dt.pickUpInformation,
            
        })
    }
}
const CurrentAuction = () => {
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
    }, [db] );  // Prevents unnecessary updates by waiting until firebase reports a change to update.
        // For testing, display all auction event id's and titles.
    
    // Note as of 18 March 2020, not all events are showing as they are nested in another "data layer"
    if (auctionEventData && auctionEventData.length) {
        let auctionEvent = parseData(auctionEventData[6]);
        console.log(auctionEvent)
        let dates = parseDates(auctionEvent.startDate, auctionEvent.startTime, auctionEvent.endDate, auctionEvent.endTime);
        return (
            <div className="current-auction-body">
                <Container>
                    <Row>
                        <Col>
                            <Image className="reset-image-size" src={auctionEvent.imageURL} fluid/>
                            
                        </Col>
                        <Col sm={true} className="timer">
                            <h3>{auctionEvent.title} Auction</h3>
                            <CountdownTimer date={dates}/> 
                            <p className="overlap">Time Left to Bid</p>
                            
                        </Col>
                    </Row>
                    <Row className="space">
                        
                        <Col className="toggle-special">
                            <Acordion className="divide">
                                <Card>
                                    <Card.Header className="smallToggle"><Acordion.Toggle as={Button} variant="link" size="sm" eventKey="0">
                                        <h5>See Details <Plus size='20' color="#fff"/></h5>
                                        
                                    </Acordion.Toggle></Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body className="cardBorder">
                                            <div>
                                                <h5>Description</h5>
                                                <p>{auctionEvent.description}</p>
                                            </div>
                                           <Row>
                                               <Col><h5>Location</h5></Col>
                                               <Col><h5>Product Pick Up Information</h5></Col>
                                           </Row>
                                           <Row>
                                               <Col className="reset">
                                                    <p>{auctionEvent.location.addressLine1}</p>
                                                    <p>{auctionEvent.location.addressLine2 ? auctionEvent.location.addressLine2: ""}</p>
                                                    <p>{auctionEvent.location.city}</p>
                                                    <p>{auctionEvent.location.state}</p>
                                                    <p>{auctionEvent.location.zip}</p>
                                                </Col>
                                                <Col>
                                                    <p>{auctionEvent.pickUpInformation}</p>
                                                </Col>
                                           </Row>
                                        </Card.Body>
                                        
                                    </Accordion.Collapse>
                                </Card>
                                
                            </Acordion>
                        </Col>
                    </Row>
                </Container>
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

export default CurrentAuction;