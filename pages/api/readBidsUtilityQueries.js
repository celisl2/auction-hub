// ===================================================================
//          Filename: readBidsUtilityQueries.js
//          Author:   Robert Ashley - Group 1
//          Purpose:  To provide multiple pre-defined read operations for bids in the Auction Hub System.
//                    This module, in its current state, may need adjustments to fit the
//                    rest of the system.
//          Created:  6 Mar 2020
//          Updates --------------------------------------------------
//              9 March 2020 Robert Ashley: Added preprocessing for sub-objects such as timestamps.
// ===================================================================


import {loadDB} from '../../lib/db';
    let firebase = loadDB();    // provides firebase app reference
import { useState, useEffect } from 'react';


export function getBids (auctionEventId, productId) {

    // << Do auth checks here >>

    firebase
        .firestore()
        .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')
        .get()
        .then( (snapshot) => {
            const newBidData = snapshot.docs.map((bid) => ({
                id: bid.id,
                ...bid.data()
            }));
            // It may report a "cyclic reference error" -- this is because the reference 
            // userAccountId. 

            // March 9 Edit
            if (newBidData.hasOwnProperty("timestamp")) {
                newBidData.timestamp = newBidData.timestamp.toDate();
            }

            return newBidData;
        })
// Add an optional parameter callback here to allow further processing?
        .catch( (error) => {
            return error;    // JSON object with an error 'code' and 'message', possibly other things.
        });
}


export function getBidsOnSnapshot  (auctionEventId, productId) {

    // << Do auth checks here >>

    const [bids, setBids] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')
            .onSnapshot( (snapshot) => {
                const newBidData = snapshot.docs.map((bid) => ({
                    id: bid.id,
                    ...bid.data()
                }));

                newBidData.forEach((bid) => {
                    // March 9 Edit
                if (bid.hasOwnProperty("timestamp")) {
                    bid.timestamp = bid.timestamp.toDate();
            }
                })

                setBids(newBidData);
            })
            .catch( (error) => {
                return error; // JSON object
            });

        
        // ...
        return;
    }, []);

    return bids;
}



// Read Highest Bid (one time)
// --------------------------------------------------------------
export function getHighestBid (auctionEventId, productId) {

    // << Do auth checks here >>
    
    const [highestBid, setHighestBid] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')  // Path to Bids for the above product parameters.
            .orderBy('amount', 'desc')  // Order documents with bid amount greatest to least
            .limit(1)  // Just give me the first (largest) one.
            .get()
            .then( (snapshot) => {
                
                let newBidData = {};  // set as flag to tell that no bids existed/obtainable.

                if (snapshot.size === 1) {
                   newBidData = {
                       id: snapshot.docs[0].id,
                       ...snapshot.docs[0].data()
                   }
                   // March 9 Edit
                    if (newBidData.hasOwnProperty("timestamp")) {
                        newBidData.timestamp = newBidData.timestamp.toDate();
                    }
                }

                setHighestBid(newBidData);
            })
            .catch( (error) => {
                let errorMessage = "Error in getHighestBidOnSnapshot: Firebase error.\n" + error.code + " : " + error.message;
                console.error(errorMessage)
                return false;
            })
        
        // ...
        return;
    }, []);

    return highestBid;
}


// Read Highest Bid (Listener Event)
// --------------------------------------------------------------
export function getHighestBidOnSnapshot  (auctionEventId, productId) {

    // << Do auth checks here >>
    
    const [highestBid, setHighestBid] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')  // Path to Bids for the above product parameters.
            .orderBy('amount', 'desc')  // Order documents with bid amount greatest to least
            .limit(1)  // Just give me the first (largest) one.
            .onSnapshot( (snapshot) => {
                
                let newBidData = {};  // set as flag to tell that no bids existed/obtainable.

                if (snapshot.size === 1) {
                   newBidData = {
                       id: snapshot.docs[0].id,
                       ...snapshot.docs[0].data()
                    }
                    // March 9 Edit
                    if (newBidData.hasOwnProperty("timestamp")) {
                        newBidData.timestamp = newBidData.timestamp.toDate();
                    }
                }

                setHighestBid(newBidData);
            }, (error) => {
                let errorMessage = "Error in getHighestBidOnSnapshot: Firebase error.\n" + error.code + " : " + error.message;
                console.error(errorMessage)
                return false;
            })
        
        // ...
        return;
    }, []);

    return highestBid;
}

export function getHighestBidOffset  (auctionEventId, productId, indexOffset) {

    // << Do auth checks here >
    
    const [highestBid, setHighestBid] = useState([])

    useEffect( () => {

        if (typeof indexOffset != "number") {
            let errorMessage = "Error in getHighestBidOffset: indexOffset provided is not a number.";
            console.error(errorMessage)
            return false;
        }

        // To Do: get product data so that we know if a product is sold or not?

        firebase
            .firestore()
            .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')  // Path to Bids for the above product parameters.
            .orderBy('amount', 'desc')  // Order documents with bid amount greatest to least
            //.startAt()
            //.limit(1)  // Just give me the first (largest) one.
            .get()
            .then( (snapshot) => {


                const bidData = snapshot.docs.map((bid) => ({
                    id: bid.id,
                    ...bid.data()
                }));

                if (indexOffset < snapshot.size) {

                    // March 9 Edit
                    if (newBidData[indexOffset].hasOwnProperty("timestamp")) {
                        newBidData[indexOffset].timestamp = newBidData[indexOffset].timestamp.toDate();
                    }
                   return bidData[indexOffset]

                }

                setHighestBid(newBidData);
            })
        
        // ...
        return;
    }, []);

    return highestBid;
}