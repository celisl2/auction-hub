/*
File Name: edit_product.js
Purpose: Displays all current products and allows them to be edited.
Document Created By: Team 1
*/

import AdminNav from '../components/AdminNav';
import {getCode} from '../utils/helperFunctions';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import {loadDB} from '../lib/db';
import ProductsList from '../components/ProductsList';
import HomeForbidden from '../components/HomeForbidden';
import Alert from 'react-bootstrap/Alert';

let db = loadDB();

//Handles how the states are set for handling editing auctions.
let EditProducts = () => {
    const [auctionID, setAuctionId] = useState(null);
    const [show, setShow] = useState(true);
    const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//Pulls the active auction information.
    useEffect( () => {
        const unsubscribe = db
            .firestore()
            .collection('AuctionEvent')
            .where('isActive', '==', true)
            .onSnapshot( (snapshot) => {
                if(snapshot.size) {
                    setAuctionId(snapshot.docs[0].id);
                    db
                    .firestore()
                    .collection('AuctionEvent').doc(snapshot.docs[0].id)
                    .collection('AuctionProduct').get()
                    .then((doc) => {
                        console.log(doc.size)
                        if (doc.size == 0) {
                            setIsEmpty(true);
                            console.log('here')
                        }
                    }).catch(function(error) {
                        console.log("Error getting document:", error);
                    });
                }
            });

            return () => { unsubscribe() };
    }, [db, auctionID, isEmpty] );

//Checks admin account.
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
    }, [db, auctionID, isEmpty] );


//Renders page if user is an admin.

//true if snapshot came back empty

    if(currentUserIsAdmin == "true") {
        return (
            <div className="edit-auction-body">
                <AdminNav />
                <Container>
                    <h2 className="text-center mx-auto space text-header">Edit Auction Products</h2>
                </Container>
                {!isEmpty ?
                <>
                <Row>
                    <Col><h3 className="flag-title">Products for Active Auction</h3></Col>
                    <Col md={3}>
                    {show ? <Button variant='secondary' onClick={handleClose}>Close</Button> : <Button variant='info' onClick={handleShow}>Expand</Button>}

                    </Col>
                </Row>
                    {show ? (
                        <>
                        {auctionID ? <ProductsList user="admin" props={auctionID}/> : <p>loading</p>}
                        </>
                    ): (
                        <>
                            <p></p>
                        </>
                    )}
                </> : <Container><Alert variant='warning'>The current active auction does not have any products. Please create products before you can edit them</Alert></Container>}
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


export default EditProducts;
