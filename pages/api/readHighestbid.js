// /////////////////////////////////////////////////////////
//    
//    Filename:   readHighestBid.js
//    Programmer: Robert Ashley
//    Created:    9 March 2020
//    Updates:    26 March 2020 (Robert Ashley) Cleaning up and revising option to pull the nth highest bid.
//    Purpose: Retrieves the one bid, if it exists, for the given auction and product
//
// /////////////////////////////////////////////////////////
// INPUTS
// auctionEventID : Firestore document id referring to the auction event
// productID : Firestore document id referring to the product under the above auction event
// offset : offset in the zero-indexed ordered list of bids, highest to lowest. Defaults to the 
//              first element (index 0).
import {loadDB} from '../../lib/db';
let db = loadDB();
export default function readHighestBid (auctionEventID, productID, offset=0) {
    console.log( "DEBUG: readHighestBid:  aucEv:" + auctionEventID + " , prod:" + productID);
    if(db.auth().currentUser !== null) {
        // Verify ID's are given, so the proper data can be found.
        if (!auctionEventID || auctionEventID === "") {
            console.error("ID for auction event product belongs to is not given.");
            return false;
        }
        if (!productID || productID === "") {
            console.error("ID for auction event product belongs to is not given.");
            return false;
        }
        db
        .firestore()
        .collection('/AuctionEvent/' + auctionEventID + 
            '/AuctionProduct/' + productID + 
            '/BidHistory')
        .orderBy('amount', 'desc')
        //.startAt(offset)
        //.limit(1)
        .get()
        .then( (bidSnapshot) => {
            if (bidSnapshot.size && bidSnapshot.size > offset) {
                let highestBid = { 
                    id: bidSnapshot.docs[offset].id,
                    ...bidSnapshot.docs[offset].data()
                };
                console.log("DEBUG: Highest bid (Offset " + offset + ") is: " + JSON.stringify(highestBid, null, 4));
                return highestBid;
            }
            else {
                // No bids. If you need a min value to place bids, use product.minBid.
                console.log("DEBUG: No highest bid given parameters.");
                return false;
            }
        })
    }
}