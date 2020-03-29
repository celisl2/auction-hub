// /////////////////////////////////////////////////////////
//    
//    Filename:   readHighestBid.js
//    Programmer: Robert Ashley
//    Created:    9 March 2020
//    Updates:    26 March 2020, 28 March 2020: (Robert Ashley) Cleaning up and revising option to pull the nth highest bid.
//    Purpose: Retrieves the one bid, if it exists, for the given auction and product
//
// /////////////////////////////////////////////////////////
// INPUTS
// auctionEventID : Firestore document id referring to the auction event
// productID : Firestore document id referring to the product under the above auction event
// index : index in the zero-indexed ordered list of bids, highest to lowest. Defaults to the 
//              first element (index 0).
// OUTPUT:
// Reports an object containing the data for the highest bid as an object
// Returns a null if the script encountered an error.
import {loadDB} from '../../lib/db';
let db = loadDB();
// Returns the [index] bid for the given auction/product as a Promise.
// handle the data with .then( (snap) => {}) and .catch( (err) => {}).
export default async function readHighestBid (auctionEventID, productID, index=0) {
    let bid = await db
    .firestore()
    .collection('/AuctionEvent/' + auctionEventID + 
        '/AuctionProduct/' + productID + 
        '/BidHistory')
    .orderBy('amount', 'desc')
    .get()
    .then( (bidSnapshot) => {
        if (bidSnapshot.size && bidSnapshot.size > index) {
            let highestBid = { 
                id: bidSnapshot.docs[index].id,
                ...bidSnapshot.docs[index].data()
            };
            console.log("DEBUG: [getHighestBid] :> Highest bid (index " + index + ") is: " + JSON.stringify(highestBid, null, 4));
            return highestBid;
            
        }
        else {
            // No bids. If you need a min value to place bids, use product.minBid.
            console.log("DEBUG: [getHighestBid] :>  No highest bid given parameters.");
            //resolve(null);
            return null;
        }
    })
    .catch( (err) => {
        console.error("ERROR: [getHighestBid] :>  Error: " + err);
        //resolve(null);
        return null;
    })
    return bid;
}