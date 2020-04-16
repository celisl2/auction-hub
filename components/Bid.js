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
import InputGroup from 'react-bootstrap/InputGroup';

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
    let productName = bidData.props.productData.productName;
    let pickUpInfo = bidData.props.productData.productPickUpInfo;

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
            {console.log(lowerLimit)}
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
                            .min(Number(lowerLimit) + Number(5), "Bid must be at least $5 greater than the current bid price of $" + lowerLimit)
                            .max(Number(maxBid), 'Bid must be less than or equal to $' + maxBid)
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
                            if(Number(bidAmount) <= Number(maxBid)) {
                                //user is allowed to place bid
                                if(Number(bidAmount) >= Number(lowerLimit)) {
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

                                                db.firestore().collection('Users').doc(user)
                                                .get().then((userDoc) => {
                                                    
                                                    let name = userDoc.data().firstName + ' ' + userDoc.data().lastName;
                                                    let emailAdd = userDoc.data().email;
                                                    let phoneNum = userDoc.data().phone;

                                                    db.firestore()
                                                    .collection('Reports')
                                                    .add({
                                                        auctionEventID: auctionId,
                                                        productID: productId,
                                                        productName: productName,
                                                        productPrice: Number(bidAmount),
                                                        userID: user,
                                                        paymentStatus: 'Email sent',
                                                        productPickedUp: false,
                                                        user: name,
                                                        userEmail: emailAdd,
                                                        phoneNumber: phoneNum
                                                    }).then(() => console.log("Document successfully written!"))
                                                    .catch((err) => console.error("Error writing document: ", err))
                                                })
                                                
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
                <Form.Label htmlFor="userBid">Bid Amount</Form.Label>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Your Bid: $</InputGroup.Text>
                    </InputGroup.Prepend>
                
                <Form.Control name="userBid" aria-describedby="basic-addon1" {...formik.getFieldProps('userBid')}/>
                </InputGroup>
                    {formik.touched.userBid && formik.errors.userBid ? (
                    <Alert variant='danger'>{formik.errors.userBid}</Alert>) : null}
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
