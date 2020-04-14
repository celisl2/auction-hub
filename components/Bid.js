/* /////////////////////////////////////////////////////////

// File Name: EditProductForm.js
// Purpose: Designs the component displays in the edit_auction page.
// Document Created By: Team 1
// Updated 14 April 2020 by RTA -- Comments added.
//
///////////////////////////////////////////////////////// */

import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DataContext from '../lib/bidDataContext';
import {loadDB} from '../lib/db';

let db = loadDB();

//Build the BidForm to allow bids.
const BidForm = (props) => {
    const [bidData, setBidData] = useContext(DataContext);
    const [userMessage, setUserMessage] = useState(null);
    const [alertColor, setAlertColor] = useState(null);

    let productId = bidData.props.productData.id;
    let auctionId = bidData.props.auctionEventID;
    let minBid = bidData.props.productData.minBid;
    let maxBid = bidData.props.productData.maxBid;

//Pull database info and confirm auction is active.
    const [highBidData, setHighBidData] = useState(() => {
        db
        .firestore()
        .collection('/AuctionEvent/' + auctionId + '/AuctionProduct/' + productId + '/BidHistory')
        .orderBy('amount', 'desc')
        .limit(1)
        .onSnapshot( (snapshot) => {
            if (snapshot.size) {
                let highBidDataInitial = snapshot.docs[0].data().amount;
                return highBidDataInitial;
            }

            else {
                return null;
            }
        });
    });

//Check if a person has bidded on the product.
    const [lowerLimit, setLowerLimit] = useState(() => {
            if(highBidData)
                return highBidData;
            else
                return minBid;
        })
    useEffect(() => {
      //access database
        const unsubscribe = db
        .firestore()
        .collection('/AuctionEvent/' + auctionId + '/AuctionProduct/' + productId + '/BidHistory')
        .orderBy('amount', 'desc')
        .limit(1)
        .onSnapshot( (snapshot) => {
            if (snapshot.size) {
                let highBid = snapshot.docs[0].data().amount;
                setHighBidData(highBid);
                setLowerLimit(highBid);
            }
        });

        return () => { unsubscribe() };
    }, [db]);
    console.log(lowerLimit);
    return (
        <div>
            {userMessage ? <Alert variant={alertColor}>{userMessage}</Alert> : ""}
        <Formik
                //Set initial values to null
                initialValues={{
                    userBid: ''
                }}

                //Using validiation schema
                validationSchema={
                    Yup.object({
                        userBid: Yup.number().integer('Bid must be a whole number')
                            .positive('Bid must be a positive number ')
                            .required('Please select bid amount'),
                    })
                }

                //Handle submitted data
                onSubmit={ (values, {setSubmitting}) => {

                    try {
                        let bidAmount = values.userBid;
                        let user = db.auth().currentUser.uid;
                        if (!!user) {

                          //Check if Bid amount is valid.
                            if(bidAmount <= maxBid) {
                                //user is allowed to place bid
                                if(bidAmount >= lowerLimit) {
                                    //user is placing buyout bid
                                    if(bidAmount == maxBid) {

                                          //Access Database
                                            db.firestore()
                                            .collection('/AuctionEvent/' + auctionId + '/AuctionProduct/' + productId + '/BidHistory')
                                            .add({
                                                amount: Number(bidAmount),
                                                timestamp: db.firestore.FieldValue.serverTimestamp(),
                                                bidderID: user,
                                                productWinner: user,

                                                //Bid was successful
                                            }).then(docRef => {
                                                setAlertColor('success');
                                                setUserMessage('You have placed the highest bid. You will recieve an email with instructions on how to pay and recieve your product.');
                                                console.log('bid placed for ' + docRef.id);
                                            })

                                            //An error or occured
                                            .catch( (err) => {
                                                console.error("A problem occurred trying to place a buyout on product " + productId + ": " + err);
                                            })

                                            //Ensures the highest bid exists.
                                            db.firestore().collection('AuctionEvent/' + auctionId + '/AuctionProduct').doc(productId).update({
                                                highestBidPlaced: true
                                            })
                                       //}
                                    } //user is placing bid less than maxBid
                                    else {

                                            db.firestore()
                                            .collection('/AuctionEvent/' + auctionId + '/AuctionProduct/' + productId + '/BidHistory').add({
                                                amount: Number(bidAmount),
                                                timestamp: db.firestore.FieldValue.serverTimestamp(),
                                                bidderID: user,
                                            })
                                            .then(docRef => {
                                                setAlertColor('success');
                                                setUserMessage('Bid was placed successfully');
                                                console.log('bid placed for ' + docRef.id);
                                            })
                                            .catch( (err) => {
                                                console.error("A problem occurred trying to place a bid on product " + productId + ": " + err);
                                            })
                                        //}

                                    }
                                    setSubmitting(true);
                                }
                                //Bid amount is greater than minimum bid error.
                                else {
                                    console.log(bidAmount);
                                    setAlertColor('danger');
                                    setUserMessage('Bid must be greater or equal to $' + minBid);
                                    setSubmitting(false);
                                }
                            }

                            //Bid amount is less than minimum bid error.
                            else {
                                console.log(bidAmount);
                                setAlertColor('danger');
                                setUserMessage('Bid must be less than or equal to $' + maxBid);
                                setSubmitting(false);
                            }
                        }
                        //If a user is not logged in
                        else {
                            throw ("User is not logged-in for bidding!");
                        }
                    }
                    //If the error is unspecified.
                    catch (err) {
                        console.error("DEBUG: Caught Error: " + err);
                    }


                }}
            >
            { formik => (
                <Form onSubmit={formik.handleSubmit}>
                <Form.Label htmlFor="userBid">Select Bid Amount</Form.Label>
                <Form.Control as="select" name="userBid" {...formik.getFieldProps('userBid')}>
                        <option>Click to select</option>
                        <option value={Number(lowerLimit) + Number(5)}>{`(+5) Total Bid: $${ Number(lowerLimit) + Number(5)}`}</option>
                        <option value={Number(lowerLimit) + Number(10)}>{`(+10) Total Bid: $${ Number(lowerLimit) + Number(10)}`}</option>
                        <option value={Number(lowerLimit) + Number(15)}>{`(+15) Total Bid: $${ Number(lowerLimit) + Number(15)}`}</option>
                        <option value={Number(lowerLimit) + Number(20)}>{`(+20) Total Bid: $${ Number(lowerLimit) + Number(20)}`}</option>
                    </Form.Control>
                    {formik.touched.userBid && formik.errors.userBid ? (
                    <div>{formik.errors.userBid}</div>) : null}
                    <Button className="space" variant="outline-success" type="submit">Place Bid</Button>
                </Form>
            )}
        </Formik>
        </div>
    )
}


//Aaccess the database and pull necessary data for component.
const Bid = (props) => {
    const [bidData, setBidData] = useContext(DataContext);

    //Access Database.
    const [highBidData, setHighBidData] = useState(() => {
        db
        .firestore()
        .collection('/AuctionEvent/' + aucID + '/AuctionProduct/' + prodID + '/BidHistory')
        .orderBy('amount', 'desc')
        .limit(1)
        .onSnapshot( (snapshot) => {
            if (snapshot.size) {
                let highBidDataInitial = snapshot.docs[0].data().amount;
                return highBidDataInitial;
            }
            else {
                return null;
            }
        });
    });

    let minBid = bidData.props.productData.minBid;
    let prodID = bidData.props.productData.id;
    let aucID = bidData.props.auctionEventID;

    useEffect(() => {
        const unsubscribe = db
        .firestore()
        .collection('/AuctionEvent/' + aucID + '/AuctionProduct/' + prodID + '/BidHistory')
        .orderBy('amount', 'desc')
        .limit(1)
        .onSnapshot( (snapshot) => {
            if (snapshot.size) {
                let highBid = snapshot.docs[0].data().amount;
                setHighBidData(highBid);
            }
        });

        return () => { unsubscribe() };
    }, [db]);


//Render component.
    return (
        <div>
            <h4>Current Bid Price{highBidData ? ': $' + highBidData : ': $' + minBid}</h4>
            <BidForm />
        </div>
    )
};

export default Bid;
