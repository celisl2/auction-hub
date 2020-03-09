// /////////////////////////////////////////////////////////
//    
//    Filename:   createBidQuery.js
//    Programmer: Robert Ashley
//    Created:    6 Mar 2020
//    Updated:    7 Mar 2020 Robert Ashley : Changed (temp?) to obtain all necessary data from queries at call.
//                                           Needs changes (feel free to edit) so that it reports results of
//                                           the queries correctly, being as the queries are async. 
//
//                9 March 2020 : Added minor changes to formatting, parsing code.
// /////////////////////////////////////////////////////////


import {loadDB} from '../../lib/db';
import {Cookies} from 'js-cookie';
import "firebase/auth";

let firebase = loadDB();



export default function placeBid (auctionEventId, productId, bidAmount) {

    // to do : test by pulling user data from auth.

    if(firebase.auth().currentUser !== null) {

        /*
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
        */
        try {
            let currentTimestamp = Date.now();
        
            firebase
                .firestore()
                .doc('/AuctionEvent/' + auctionEventId)
                .get()
                .then ( (eventSnapshot) => {

                    //let beginEventTime = eventSnapshot.data().timeStart.seconds * 1000 + eventSnapshot.data().timeStart.nanoseconds;
                    let beginEventTime = new Date(eventSnapshot.timeStart.toDate()).getTime();
                    //let endEventTime = eventSnapshot.data().timeEnd.seconds * 1000 + eventSnapshot.data().timeEnd.nanoseconds;
                    let endEventTime = new Date(eventSnapshot.timeEnd.toDate()).getTime();

                    if (beginEventTime > currentTimestamp || endEventTime < currentTimestamp)
                    {
                        let errorMessage = "You cannot bid on a product: The event " + eventSnapshot.data().name + " is not currently open."
                        console.error("DEBUG: currentTimestamp=" + new Date(currentTimestamp) + "    beginEventTime=" + new Date (beginEventTime) + "     endEventTime=" + new Date(endEventTime));
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
                        let productBuyout = productSnapshot.data().buyoutPrice

    // !!! Need rules for tracking buyout !!! //
    // Does meeting buyout price prevent further bidding, or disables buyout and enables further bidding?

                        /*
                        if (productSnapshot.data().hasOwnProperty('boughtOut'))
                        {
                            let errorMessage = "You cannot bid on a product: This product was already won via buyout."
                            //Cookies.set('errorMesssage', errorMessage);
                            console.error(errorMessage);
                            return false;
                        }
                        */

                        // .. and get the data for the current highest bid on the product for comparison.
                        firebase
                        .firestore()
                        .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')
                        .orderBy('amount', 'desc')
                        .limit(1)
                        .get()
                        .then( (currentHighestBid ) => {
                            
                            let hasBids = Object.keys(currentHighestBid).length === 0 && currentHighestBid.constructor === Object;

                            let currentHighBidAmount = hasBids ? currentHighestBid.data().amount : productMinBid;

                            let currentUserAccountId = firebase.auth().currentUser.uid
                            console.log("UID:" + currentUserAccountId);

                            //if (bidAmount >= productMinBid ) {
                            if (bidAmount >= currentHighBidAmount && bidAmount <= productBuyout) {
                                let bidData = {
                                    amount: bidAmount,
                                    timestamp: currentTimestamp
                                };

// (!!!) I am assuming here that the bids will use the userAccountId as its document ID so that the highest bid per user is recorded rather than each bid.
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
                                        console.log("placeBid: Bid placed by user as document: " + currentUserAccountId);
                                        return true;
                                    })
                                    .catch( (setBidError) => {
                                        console.error("Error: in placeBid: Firebase error " + setBidError.code + " : " + setBidError.message);
                                        return false;
                                    })
                            }
                            else {
                                let errorMessage = "Error: In placeBid: Bid being placed by " + userAccountId + "not in valid range. Bid given: " + bidAmount + ".";
                                console.error(errorMessage);
                                return false;
                            }

                        })    

                    }) .catch ( (productError) => {
                        let errorMessage = "In submitting the bid, there was an error in obtaining and processing product data: " + JSON.stringify(productError);
                        console.error(errorMessage);
                        return false;
                    })

                }) .catch ( (eventError) => {
                    let errorMessage = "In submitting the bid, there was an error in obtaining and processing product data: " + JSON.stringify(eventError);
                    //Cookies.set('errorMesssage', errorMessage);
                    console.error(errorMessage);
                    return false;
            })
        }
        catch (err) {
            console.error("createProductnQuery.js: Error: ", err)
            return false;
        }

    }
    else {

    }
}