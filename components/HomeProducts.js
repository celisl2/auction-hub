// ProductDisplay.js // <ProductDisplay aucID prodData /> Robert Ashley 22 Mar
// 2020 Given its props from another component, this renders a product card
// showing information on the product as well as the interface to bid on the
// item. PROPS:
// - aucID: string value representing the document under /AuctionEvent/ in the
// Google Cloud Firestore database containing auction data. Useful for
// determining if bids are valid.
// - prodData: object in JSON format that has all information on the product
// displayed: obtained via   a query on Firestore and passed into here.

import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {PlusCircle} from 'react-feather';
import CurrentBid from './CurrentBid';
import Bid from './Bid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DataContext from '../lib/bidDataContext';
import {loadDB} from './../lib/db';

let db = loadDB();

const HomeProducts = (props) => {
    //console.log(props)
    let aucID = props.props['auctionEventID'];
    let prodData = props.props['productData'];
    const [auctionTime, setAuctionTime] = useState(() => {
        const unsubscribe = db
        .firestore()
        .collection('AuctionEvent')
        .where('isActive', '==', true)
        .onSnapshot( (snapshot) => {
            console.log('here' + snapshot)
            return {
                date:snapshot.docs[0].data().values.startDate,
                time:snapshot.docs[0].data().values.startTime
            }
        });
    })
    const [show,
        setShow] = useState(false);
    const [bidData, setBidData] = useState([]);
    //const [highestBid, setHighestBid] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        if(props)
            setBidData(props)
    }, [bidData])

    if (aucID && aucID !== "" && prodData && prodData !== {}) {
        //console.log(JSON.stringify(prodData, null, 4));
        //console.log(prodData.highestBidPlaced);
        console.log(auctionTime)
        return (
            <div className="productCell">

                <Row>
                    <Col xs={12} md={6}>
                        <h4 className="productHead">{prodData.productName}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <img
                            className="productImg"
                            src={(prodData.productImageURL)}
                            alt="product image"/>
                        {prodData.highestBidPlaced ?
                            <>
                            <p className="padding spaceMax">Product No Longer Available!</p>
                            </> :
                            <>
                            <p className="clickBid spaceMax" onClick={handleShow}>Click to Bid
                            <PlusCircle className="blackBkg" size='20' color='#fff'/></p>
                            </>}
                    </Col>
                    <Col xs={12} md={6}>
                        <p className="responsive">{prodData.productDescription}</p>
                        {prodData.highestBidPlaced ?
                            <>
                            <div className="resSpace">
                                <p className="lightBlue">Product Bought For</p>
                                <p className="padding">${prodData.maxBid}</p>
                            </div>
                            </> :
                            <>
                            <div className="resSpace">
                                <p className="lightBlue">Click to Buy Now</p>
                                <p className="padding">${prodData.maxBid}</p>
                            </div>
                            <h6 className="double">OR</h6>
                            <CurrentBid data={{ minBid: prodData.minBid, productID: prodData.id, auctionID: aucID}}/>
                            </>
                        }
                    </Col>
                </Row>

            <DataContext.Provider value={[bidData, setBidData]}>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Place Bid For{": " + prodData.productName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Bid/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </DataContext.Provider>
                
            </div>
        );
    } else {
        // Product is loading or something went wrong...
        return (
            <div>Product Loading...</div>
        );
    }
};

export default HomeProducts;