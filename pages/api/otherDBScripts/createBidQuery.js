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
import "firebase/auth";

let firebase = loadDB();



export default function placeBid (auctionEventId, productId, bidAmount) {
//export default (req, res) => {
    /*
    let auctionEventId = req.params['auctionEventId'];
    let productId = req.params['productId'];
    let bidAmount = req.params['bidAmount'];
    let userId = req.params['userId'];  // opt -- pull from auth
    */

    if(firebase.auth().currentUser !== null) {

        try {
            let currentTimestamp = Date.now();

            let currentUserAccountId = firebase.auth().currentUser.uid
            //console.log("UID:" + currentUserAccountId);

            // Make sure amount can be parsed and stored as a number
            bidAmount = Number.parseFloat(bidAmout);
            if (NaN(bidAmount)) {
                throw "The value provided for bid amount could not be interpreted as a number.";
            }
        
            // To do: Rewrite & restructure to have all data calls to come from existing functions (via api calls or react hooks)

            firebase
                .firestore()
                .doc('/AuctionEvent/' + auctionEventId)
                .get()
                .then ( (eventSnapshot) => {

                    let beginEventTime = new Date(eventSnapshot.timeStart.toDate()).getTime();
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

                        let productMinBid = Number.parseFloat(productSnapshot.data().bid);
                        if (isNaN(productMinBid)) {
                            throw "The value retrieved for minumum bid could not be interpreted as a number.";
                        }
                        let productBuyout = productSnapshot.data().buyoutPrice
                        if (isNaN(productBuyout)) {
                            throw "The value retrieved for buyout price could not be interpreted as a number.";
                        }
                        
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
                                        //return true;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(JSON.stringify({status: "successful"}));
                                        res.status(200).end();

                                    })
                                    .catch( (setBidError) => {
                                        let errorMsg = "Error: in placeBid: Firebase error " + setBidError.code + " : " + setBidError.message;
                                        console.error(errorMsg);
                                        /*
                                        res.setHeader('Content-Type', 'application/json');
                                        res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
                                        */
                                        return false;
                                    })
                            }
                            else {
                                let errorMsg = "Error: In placeBid: Bid being placed by " + userAccountId + "not in valid range. Bid given: " + bidAmount + ".";
                                console.error(errorMsg);
                                /*
                                res.setHeader('Content-Type', 'application/json');
                                res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
                                */
                                return false;
                            }

                        })    

                    }) .catch ( (productError) => {
                        let errorMsg = "In submitting the bid, there was an error in obtaining and processing product data: " + JSON.stringify(productError);
                        console.error(errorMsg);
                        /*
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
                        */
                        return false;
                    })

                }) .catch ( (eventError) => {
                    let errorMsg = "In submitting the bid, there was an error in obtaining and processing product data: " + JSON.stringify(eventError);
                    console.error(errorMsg);
                    /*
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
                    */
                    return false;
            })
        }
        catch (err) {
            let errorMsg = "createProductnQuery.js: Error: ", err
            console.error(errorMsg)
            /*
            res.setHeader('Content-Type', 'application/json');
            res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
            */
            return false;
        }

    }
    else {
        let errorMsg = "You are not authorized to view this page!"
        console.error(errorMsg);
        /*
        res.setHeader('Content-Type', 'application/json');
        res.status(500).end(JSON.stringify({success: true, error: errorMsg}));
        */
        // Return to front end for login
        return false;
    }
}
