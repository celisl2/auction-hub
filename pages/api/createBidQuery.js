// /////////////////////////////////////////////////////////
//    
//    Filename:   createBidQuery.js
//    Programmer: Robert Ashley
//    Created:    6 Mar 2020
//    Updated:    7 Mar 2020 Robert Ashley : Changed (temp?) to obtain all necessary data from queries at call.
//                                           Needs changes (feel free to edit) so that it reports results of
//                                           the queries correctly, being as the queries are async. 
//
// /////////////////////////////////////////////////////////


import {loadDB} from '../../lib/db';
import {Cookies} from 'js-cookie';
import "firebase/auth";

let firebase = loadDB();

/*
export function placeBid (auctionEventId, productId, userAccountId, productMinBid, productBuyout, bidAmount, auctionStart, auctionEnd) {

    // to do : test by pulling user data from auth.


    if(firebase.auth().currentUser !== null) {

        // Assure that the bid amount is stored as a number.
        if (typeof bidAmount != "number") {
            
            let oldBidAmount = bidAmount;
            bidAmount = Integer.ParseInt(bidAmount);
            
            if (isNaN(bidAmount)) {
                // The parsing attempt was not successful. Back out with error.
                let errorMessage = "Error: In placeBid: cannot convert value bidAmount (" + oldBidAmount + ") to a number. Aborting bid placement for user "
                console.error(errorMessage);
                //Cookies.set('errorMessage', errorMessage)
            }

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
                        
                        //.collection('/AuctionEvent/' + auctionEventId + 
                        '/AuctionProduct/' + productId + 
                        '/BidHistory/')
                        //.add(bidData)
                        
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
                    //Cookies.set('errorMessage', errorMessage);
                    return false;
                }

            })    

        }

    }

    // Retrieve current highest bid data so some comparisons can be made.

}
*/

// ==================================================================================================================================
// ==================================================================================================================================




export function placeBid (auctionEventId, productId, bidAmount) {

    // to do : test by pulling user data from auth.


    if(firebase.auth().currentUser !== null) {

        // Assure that the bid amount is stored as a number.
        if (typeof bidAmount != "number") {
            
            let oldBidAmount = bidAmount;
            bidAmount = Integer.ParseInt(bidAmount);
            
            if (isNaN(bidAmount)) {
                // The parsing attempt was not successful. Back out with error.
                let errorMessage = "Error: In placeBid: cannot convert value bidAmount (" + oldBidAmount + ") to a number. Aborting bid placement for user "
                console.error(errorMessage);
                //Cookies.set('errorMessage', errorMessage)
            }

        }

        let currentTimestamp = Date.now();
        
        firebase
            .firestore()
            .doc('/AuctionEvent/' + auctionEventId)
            .get()
            .then ( (eventSnapshot) => {

                let beginEventTime = eventSnapshot.data().timeStart.seconds * 1000 + eventSnapshot.data().timeStart.nanoseconds;
                let endEventTime = eventSnapshot.data().timeEnd.seconds * 1000 + eventSnapshot.data().timeEnd.nanoseconds;

                if (beginEventTime > currentTimestamp || endEventTime < currentTimestamp)
                {
                    let errorMessage = "You cannot bid on a product: The event " + eventSnapshot.data().name + " is not currently open."
                    console.error("DEBUG: currentTimestamp=" + new Date(currentTimestamp) + "    beginEventTime=" + new Date (beginEventTime) + "     endEventTime=" + new Date(endEventTime));
                    //Cookies.set('errorMesssage', errorMessage);
                    console.error(errorMessage);
                    return false;
                }

                // ... then product data for the product that's being bid on ...
                firebase
                .firestore()
                .doc('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId)
                .get()
                .then( (productSnapshot) => {

                    let productMinBid = productSnapshot.data().bid;
                    //let productBuyout = productSnapshot.data().buyoutPrice

// !!! Need rules for tracking buyout !!! //
// Does meeting buyout price prevent further bidding, or disables buyout and enables further bidding?

                    if (productSnapshot.data().hasOwnProperty('boughtOut'))
                    {
                        let errorMessage = "You cannot bid on a product: This product was already won via buyout."
                        //Cookies.set('errorMesssage', errorMessage);
                        console.error(errorMessage);
                        return false;
                    }

                    // .. and get the data for the current highest bid on the product for comparison.
                    firebase
                    .firestore()
                    .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')
                    .orderBy('amount', 'desc')
                    .limit(1)
                    .get()
                    .then( (currentHighestBid ) => {
                        
                        let hasBids = Object.keys(currentHighestBid).length === 0 && currentHighestBid.constructor === Object;

                        let currentHighBidAmount = hasBids ? currentHighestBid.data().amount : productSnapshot.data().bid;

                        // Check for buyout first
                        /*
                        if ( hasBids && currentHighBidAmount <= productBuyout) {
                            // This product has been bid on and bought out. The user cannot bid on this product.
                            console.error("Error: In placeBid -- This product has already been purchased. Bid Placement Aborted for user ")
                            return false;
                        }
                        */

                        // Check if the bid is of valid amount ( old highest bid < new amount <= buyout )
                        /*
                        if ( (!hasBids && bidAmount >= productMinBid || bidAmount > currentHighBidAmount) && bidAmount <= productBuyout  ) {
                            // The bid provided is the minumum+/first bid, or is greater than the current highest bid AND the bid fits within the buyout maximum
                            
                            let bidData = {
                                amount: bidAmount,
                                timestamp: currentTimestamp,
                                userAccountId: firebase.auth().currentUser
                            };

                            // (!!!) I am assuming here that the bids will use the userAccountId as its document ID so that the highest bid per user is placed.
                            firebase
                                .firestore()
                                .doc('/AuctionEvent/' + auctionEventId + 
                                    '/AuctionProduct/' + productId + 
                                    '/BidHistory/' + userAccountId)
                                .set(bidData)
                                
                                // Alt: If we want to store ALL bids and use RNG document IDs, use commented instead:
                                //.collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory/')
                                //.add(bidData)
                                
                                .then( (results) => {
                                    console.log("placeBid: Bid placed by user as document" + userAccountId);
                                    return true;
                                })
                                .catch( (error) => {
                                    console.error("Error: in placeBid: Firebase error " + error.code + " : " + error.message);
                                    return false;
                                })
                        }
                        */
                        let currentUserAccountId = firebase.auth().currentUser.uid
                        console.log("UID:" + currentUserAccountId);



                        if (bidAmount >= productMinBid) {
                            let bidData = {
                                amount: bidAmount,
                                timestamp: currentTimestamp,
                                userAccountId: currentUserAccountId
                            };

                            // (!!!) I am assuming here that the bids will use the userAccountId as its document ID so that the highest bid per user is placed.
                            firebase
                                .firestore()
                                .doc('/AuctionEvent/' + auctionEventId + 
                                    '/AuctionProduct/' + productId + 
                                    '/BidHistory/' + currentUserAccountId)
                                .set(bidData)
                                
                                // Alt: If we want to store ALL bids and use RNG document IDs, use commented instead:
                                //.collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory/')
                                //.add(bidData)
                                
                                .then( (results) => {
                                    console.log("placeBid: Bid placed by user as document" + currentUserAccountId);
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
                            //Cookies.set('errorMessage', errorMessage);
                            return false;
                        }

                    })    


                }) .catch ( (productError) => {
                    let errorMessage = "In submitting the bid, there was an error: " + JSON.stringify(productError);
                    //Cookies.set('errorMesssage', errorMessage);
                    console.error(errorMessage);
                    return false;
                })

            }) .catch ( (eventError) => {
                let errorMessage = "In submitting the bid, there was an error: " + JSON.stringify(eventError);
                //Cookies.set('errorMesssage', errorMessage);
                console.error(errorMessage);
                return false;
            })

        // Need to revise how this error is used: erroneously calls
        /*
        let errorMessage = "An unknown error occurred in placeBid in createBidQuery.js"
        //Cookies.set('errorMessage', errorMessage);
        console.error(errorMessage);
        return false;
        */

    }
}


export default placeBid;