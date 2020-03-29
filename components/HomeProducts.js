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
import Link from 'next/link';
import {PlusCircle} from 'react-feather';
import CurrentBid from './CurrentBid';
import Bid from './Bid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DataContext from '../lib/bidDataContext';
import HighestBidContext from '../lib/highestBidContext';


const HomeProducts = (props, {highestBid}) => {

    let aucID = props.props['auctionEventID'];
    let prodData = props.props['productData'];

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
                        <p className="clickBid spaceMax" onClick={handleShow}>Click to Bid
                            <PlusCircle className="blackBkg" size='20' color='#fff'/></p>
                    </Col>
                    <Col xs={12} md={6}>
                        <p className="responsive">{prodData.productDescription}</p>
                        <div className="resSpace">
                            <p className="lightBlue">Click to Buy Now</p>
                            <p className="padding">${prodData.maxBid}</p>
                        </div>
                        <h6 className="double">OR</h6>
                        { /* <HighestBidContext.Provider value={[highestBid, setHighestBid]}> */}
                            <CurrentBid data={{ minBid: prodData.minBid, productID: prodData.id, auctionID: aucID}}/>
                        {/* </HighestBidContext.Provider></HighestBidContext.Provider> */}
                        
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