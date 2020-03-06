// /////////////////////////////////////////////////////////
//    
//    Filename:   createBidQuery.js
//    Programmer: Robert Ashley
//    Created:    6 Mar 2020
//    Updated:    
//
// /////////////////////////////////////////////////////////


import {loadDB} from '../../lib/db';
import {Cookies} from 'js-cookie';
let firebase = loadDB();

export function placeBid (auctionEventId, productId, userAccountId, productMinBid, productBuyout, bidAmount, bid_timestamp) {

    if (true) {    // !!! Test authentication here


        // Assure that the bid amount is stored as a number.
        if (typeof bidAmount != "number") {
            let oldBidAmount = bidAmount;
            bidAmount = Integer.ParseInt(bidAmount);
            if (isNaN(bidAmount)) {
                // The parsing attempt was not successful. Back out with error.
                let errorMessage = "Error: In placeBid: cannot convert value bidAmount (" + oldBidAmount + ") to a number. Aborting bid placement for user "
                console.error(errorMessage);
                Cookies.set('errorMessage', errorMessage)
            }
        }

        // Retrieve current highest bid data so some comparisons can be made.

// Robert: I'm wondering if I can't create an extra '.then()' block on
//         readBidsUtilityQueries.js > useHighestBid in order to run the
//         .then() below as a callback passed via parameter.

        firebase
            .firestore()
            .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')
            .orderBy('amount', 'desc')
            .limit(1)
            .get()
            .then( (currentHighestBid ) => {
                
                let hasBids = Object.keys(currentHighestBid).length === 0 && currentHighestBid.constructor === Object;

                // Check for buyout first
                if ( hasBids && currentHighestBid <= productBuyout) {
                    // This product has been bid on and bought out. The user cannot bid on this product.
                    console.error("Error: In placeBid -- This product has already been purchased. Bid Placement Aborted for user ")
                    return false;
                }

                // Check if the bid is of valid amount ( old highest bid < new amount <= buyout )
                if ( (!hasBids && bidAmount >= productMinBid || bidAmount > currentHighestBid.amount) && bidAmount <= productBuyout  ) {
                    // The bid provided is the minumum+/first bid, or is greater than the current highest bid AND the bid fits within the buyout maximum
                    
                    let bidData = {
                        amount: bidAmount,
                        timestamp: Date.now(),
                        userAccountId: userAccountId
                    };

                    // (!!!) I am assuming here that the bids will use the userAccountId as its document ID so that the highest bid per user is placed.
                    firebase
                        .firestore()
                        .doc('/AuctionEvent/' + auctionEventId + 
                            '/AuctionProduct/' + productId + 
                            '/BidHistory/' + userAccountId)
                        .set(bidData)
                        // Alt: If we want to store ALL bids and use RNG document IDs, use commented instead:
                        /*
                        .collection('/AuctionEvent/' + auctionEventId + 
                        '/AuctionProduct/' + productId + 
                        '/BidHistory/')
                        .add(bidData)
                        */
                        .then( (results) => {
                            console.log("placeBid: Bid placed by user as document" + userAccountId);
                            return true;
                        })
                        .catch( (error) => {
                            console.error("Error: in placeBid: Firebase error " + error.code + " : " + error.message);
                            return false;
                        })
                }
                else {
                    let errorMessage = "Error: In placeBid: Bid being placed by " + userAccountId + "not in valid range. Bid given: " + bidAmount + ".";
                    console.error(errorMessage);
                    Cookies.set('errorMessage', errorMessage);
        return false;
                }

                    })    

    }

}

export default placeBid;