// ProductDisplay.js // <ProductDisplay aucID prodData />
// Robert Ashley
// 22 Mar 2020
// Given its props from another component, this renders a product card showing information on the product
// as well as the interface to bid on the item.
// PROPS:
// - aucID: string value representing the document under /AuctionEvent/ in the 
//   Google Cloud Firestore database containing auction data. Useful for determining if bids are valid.
// - prodData: object in JSON format that has all information on the product displayed: obtained via
//   a query on Firestore and passed into here.

import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import {ArrowRightCircle} from 'react-feather';


export default (props) => {
    //console.log( JSON.stringify(props, null, 4));
    //console.log("ProductDisplay:> aucID=" + props.props['aucID'] + "  prodData=" + props.props['prodData']);
    // aucID, prodData
    let aucID = props.props['auctionEventID'];
    let prodData = props.props['productData'];
    if ( aucID && aucID !== "" && prodData && prodData !== {}) {
        console.log(JSON.stringify(prodData, null, 4));
        // Some sample data is displayed below, to demonstrate functionality
        // Add a bidding component as a child of this productDisplay that controls bidding
        // on this specific product.
        return (
            <div className="productCell">
                
                <Row>
                    <Col xs={12} md={6}><h4 className="productHead">{prodData.productName}</h4></Col>
                    <Col className="responsive" xs={12} md={6}><Link href="#"><a className="clickBid">Click to Bid <ArrowRightCircle className="blackBkg" size='20' color='#fff'/></a></Link></Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <img className="productImg" src={(prodData.productImageURL)} alt="product image" />
                    </Col>
                    <Col xs={12} md={6}>
                        <p className="responsive">{prodData.productDescription}</p>
                        <div className="resSpace">
                            <p className="lightBlue">Buy Now Price</p>
                            <p className="padding">${prodData.maxBid}</p>
                        </div>
                        
                    </Col>
                </Row>

            </div>
        );
    }
    else {
        // Product is loading or something went wrong...
        return(<div>Product Loading...</div>);
    }
    
};

