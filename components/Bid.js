import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DataContext from '../lib/bidDataContext';
import {loadDB} from '../lib/db';

let db = loadDB();



const BidForm = (props) => {
    const [bidData, setBidData] = useContext(DataContext);
    const [userMessage, setUserMessage] = useState(null);
    const [alertColor, setAlertColor] = useState(null);

    let productId = bidData.props.productData.id;
    let auctionId = bidData.props.auctionEventID;
    let minBid = bidData.props.productData.minBid;
    let maxBid = bidData.props.productData.maxBid;

    const [lowerLimit, setLowerLitmit] = useState(() => {
        if(highBidData)
            return highBidData;
        else
            return minBid;
    })

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
    useEffect(() => {
        const unsubscribe = db
        .firestore()
        .collection('/AuctionEvent/' + auctionId + '/AuctionProduct/' + productId + '/BidHistory')
        .orderBy('amount', 'desc')
        .limit(1)
        .onSnapshot( (snapshot) => {
            if (snapshot.size) {
                let highBid = snapshot.docs[0].data().amount;
                setHighBidData(highBid);
                setLowerLitmit(highBid);
            }
        });

        return () => { unsubscribe() };
    }, [db]);
    return (
        <div>
            {userMessage ? <Alert variant={alertColor}>{userMessage}</Alert> : ""}
        <Formik
                initialValues={{
                    userBid: ''
                }}
                validationSchema={
                    Yup.object({
                        userBid: Yup.number()
                            .required('Please select bid amount'),
                    })
                }
                onSubmit={ (values, {setSubmitting}) => {
                    let bidAmount = values.userBid;
                    if(bidAmount <= maxBid) {
                        //user is allowed to place bid
                        if(bidAmount >= lowerLimit) {
                            //user is placing buyout bid
                            if(bidAmount == maxBid) {
                                let user = db.auth().currentUser;
                                if(user) {
                                    console.log(user.uid);
                                    db.firestore()
                                    .collection('/AuctionEvent/' + auctionId + '/AuctionProduct/' + productId + '/BidHistory').add({
                                        amount: Number(bidAmount),
                                        timestamp: db.firestore.FieldValue.serverTimestamp(),
                                        productWinner: user.uid,
                                    }).then(docRef => {
                                        setAlertColor('success');
                                        setUserMessage('You have placed the highest bid. You will recieve an email with instructions on how to pay and recieve your product.');
                                        console.log('bid placed for ' + docRef.id);
                                    })
                                }
                            } //user is placing bid less than maxBid
                            else {
                                db.firestore()
                                .collection('/AuctionEvent/' + auctionId + '/AuctionProduct/' + productId + '/BidHistory').add({
                                    amount: Number(bidAmount),
                                    timestamp: db.firestore.FieldValue.serverTimestamp(),
                                })
                                .then(docRef => {
                                    setAlertColor('success');
                                    setUserMessage('Bid was placed successfully');
                                    console.log('bid placed for ' + docRef.id);
                                })
                            }
                            setSubmitting(true);
                        } else {
                            console.log(bidAmount);
                            setAlertColor('danger');
                            setUserMessage('Bid must be greater or equal to $' + minBid);
                            setSubmitting(false);
                        }
                    } else {
                        console.log(bidAmount);
                        setAlertColor('danger');
                        setUserMessage('Bid must be less than or equal to $' + maxBid);
                        setSubmitting(false);
                    }
                    
                    
                }}
            >
            { formik => (
                <Form onSubmit={formik.handleSubmit}>
                <Form.Label htmlFor="userBid">Select Bid Amount</Form.Label>
                <Form.Control as="select" name="userBid" {...formik.getFieldProps('userBid')}>
                        <option></option>
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

const Bid = (props) => {
    const [bidData, setBidData] = useContext(DataContext);
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

    return (
        <div>
            <h4>Current Bid Price{highBidData ? ': $' + highBidData : ': $' + minBid}</h4>
            <BidForm />
        </div>
    )
};

export default Bid;