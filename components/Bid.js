import React, {useState, useContext, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import * as Yup from 'yup';
import placeBid from '../pages/api/placeBid';
import DataContext from '../lib/bidDataContext';
import {loadDB} from '../lib/db';

let db = loadDB();



const BidForm = (props) => {
    const [bidData, setBidData] = useContext(DataContext);
    const [userMessage, setUserMessage] = useState(null);

    let productId = bidData.props.productData.id;
    let auctionId = bidData.props.auctionEventID;
    let minBid = bidData.props.productData.minBid;
    let maxBid = bidData.props.productData.maxBid;

    const [limit, setLitmit] = useState(() => {
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
                setLitmit(highBid);
            }
        });

        return () => { unsubscribe() };
    }, [db]);

    return (
        
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
                    let buyOut = false;

                    console.log(values);

                    if(values == maxBid)
                        buyOut = true;

                    if(values.userBid <= maxBid) {
                        console.log(limit)
                        if(values.userBid > limit) {
                            placeBid(auctionId, productId, values, buyOut, highBidData);
                            setSubmitting(true);
                        }
                        
                    } else {
                        setUserMessage('Your bid amount is not in range.');
                        setSubmitting(false);
                    }
                    
                }}
            >
            { formik => (
                <Form onSubmit={formik.handleSubmit}>
                <p>{userMessage}</p>
                <Form.Label htmlFor="userBid">Select Bid Amount</Form.Label>
                <Form.Control as="select" name="userBid" {...formik.getFieldProps('userBid')}>
                        <option></option>
                        <option value={limit + 5}>{'+'}5</option>
                        <option value={limit + 10}>{'+'}10</option>
                        <option value={limit + 15}>{'+'}15</option>
                        <option value={limit + 20}>{'+'}20</option>
                        
                    </Form.Control>
                    {formik.touched.userBid && formik.errors.userBid ? (
                    <div>{formik.errors.userBid}</div>) : null}
                    <Button className="space" variant="outline-success" type="submit">Place Bid</Button>
                </Form>
            )}
        </Formik>
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