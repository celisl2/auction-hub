// /////////////////////////////////////////////////////////
//    
//    Filename:   placeBid.js
//    Programmer: Robert Ashley
//    Created:    25 Mar 2020
//    Purpose:    Perform the database query for an authorized user to place a bid
//                on a product in the active auction.
// /////////////////////////////////////////////////////////
import {loadDB} from '../../lib/db';
import "firebase/auth";
import readHighestBid from './readHighestBid';
let db = loadDB();
// I am leaving restrictions on bids beyond being in the bounds min/max to the front end
// user interface for the time being.
//const minBidOffset = 5.0; //$
// INPUTS
// auctionEventID : Firestore document id referring to the auction event
// productID : Firestore document id referring to the product under the above auction event
// bidAmount : Value provided by user to indicate how much they want to bid. This value will
//              be rejected if it cannot be parsed as a number or is outside the min/max range
//              for bids.
//export default function placeBid (auctionEventID, productID, bidAmount) {
export default function placeBid (auctionEventID, productID, bidAmount) {
    try {
        let numBidAmount = Number.parseFloat(bidAmount);
        let userAccountID = db.auth().currentUser.uid;
        // Verify user is logged in.
        if (!userAccountID || userAccountID === "") {
            // Error -- user not identified.
            throw ("User identiy not verified.");
        }
        // Verify ID's are given, so the proper data can be found.
        if (!auctionEventID || auctionEventID === "") {
            console.error("ID for auction event product belongs to is not given.");
            return false;
        }
        if (!productID || productID === "") {
            console.error("ID for auction event product belongs to is not given.");
            return false;
        }
// Get current server timestamp on insert
        const firestoreAuctionEvent = db.firestore().collection('/AuctionEvent').doc(auctionEventID);
        const firestoreAuctionProduct = firestoreAuctionEvent.collection('/AuctionProduct').doc(productID);
        let bidTransaction = db.firestore().runTransaction( t => {
            return t.get(firestoreAuctionEvent)
            .then( (auctionEventSnapshot) => {
                // Make sure that the auction event exists
                if (!auctionEventSnapshot.exists) {
                    let errorMsg = "Error [placeBid]: Auction Event (" + auctionEventID + ") could not be found. Bid attempt aborted.";
                    console.error(errorMsg);
                    /* *** Set cookies / messages *** */
                    return false;
                }
                // // Make sure that the auction event is not inactive:
                if (!auctionEventSnapshot.data().isActive) {
                    // The auction event is currently disabled: prevent bid placement
                    let errorMsg = "Error [placeBid]: Auction Event (" + auctionEventID + ") is  not currently active. Bid attempt aborted.";
                    console.error(errorMsg);
                    /* *** Set cookies / messages *** */
                    return false;
                }
                // (Possible alteration: Make check for active event based on database timestamps)
                // If all things are well, move on to obtain and check product data:
                t.get(firestoreAuctionProduct)
                .then( (productSnapshot) => {
                    // Make sure that the product document exists
                    if (!productSnapshot.exists) {
                        let errorMsg = "Error [placeBid]: Product (" +  productID + ") in Auction Event (" + auctionEventID + ") could not be found. Bid attempt aborted.";
                        console.error(errorMsg);
                        /* *** Set cookies / messages *** */
                        return false;
                    }
                    // Check the bid amount is valid, given requirements that a bid be
                    // * Within the range [minimum bid, buyout price]
                    // * An increment of $(5) more than the previous highest bid.
                    let minimumBidAmt = productSnapshot.data().minBid;
                    let maximumBidAmt = productSnapshot.data().maxBid;
                    // How to get bids in transactions?
// !!
                    let currentHighestBid = readHighestBid(auctionEventID, productID);
                    let validBidRange = false;
                    if (!currentHighestBid) {
                        if (minimumBidAmt <= numBidAmount && numBidAmount <= maximumBidAmt) {
                            validBidRange = true;
                        }
                    }
                    else {
                        if (currentHighestBid < numBidAmount && numBidAmount <= maximumBidAmt) {
                            validBidRange = true;
                        }
                    }
                    // <= minBid
                    if (validBidRange) {
                        // We can place bid
                        let bidData = {
                            amount: numBidAmount,
                            timestamp: db.firestore.FieldValue.serverTimestamp()  
// Above should set timestamp according to DB server. VERIFY
                        }
                        db
                        .firestore()
                        .doc('/AuctionEvent/' + auctionEventID + 
                        '/AuctionProduct/' + productID + 
                        '/BidHistory/' + userAccountID)
                        .set(bidData)
                        .then( (results) => {
                            // Bid placement success
                            console.log("Bid placed for user " + userAccountID );
                            return true;
                        })
                        .catch( (bidPlaceError) => {
                            console.error("Error in writing bid to DB for user " + userAccountID + ": " + bidPlaceError);
                            return false;
                        })
                    }
                    else {
                        // The bid is outside of the allowable range of values
                        let errorMsg = "Error [placeBid]: The bid is not for a valid amount.";
                        console.error(errorMsg);
                        /* *** Set cookies / messages *** */
                        return false;
                    }
                })
            })
        });  // End of transaction bidTransaction
    }
    catch ( error ) {
        console.error("In [placeBid.js] an error occured: " + error);
        return false;
    }
}