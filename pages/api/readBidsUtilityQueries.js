// ===================================================================
//          Filename: readBidsUtilityQueries.js
//          Author:   Robert Ashley - Group 1
//          Purpose:  To provide multiple pre-defined read operations for bids in the Auction Hub System.
//                    This module, in its current state, may need adjustments to fit the
//                    rest of the system.
//          Created:  6 Mar 2020
//          Updates --------------------------------------------------
//
// ===================================================================


import {loadDB} from '../../lib/db';
    let firebase = loadDB();    // provides firebase app reference
import { useState, useEffect } from 'react';


export function useBids (auctionEventId, productId) {

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

            return newBidData;
        })
// Add an optional parameter callback here to allow further processing?
        .catch( (error) => {
            return error;    // JSON object with an error 'code' and 'message', possibly other things.
        });
}


export function useBidsOnSnapshot  (auctionEventId, productId) {

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


// Read Highest Bid (Listener Event)
// --------------------------------------------------------------
export function useHighestBid  (auctionEventId, productId) {

    // << Do auth checks here >>
    
    const [highestBid, setHighestBid] = useState([])

    useEffect( () => {
        
        firebase
            .firestore()
            .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')  // Path to Bids for the above product parameters.
            .orderBy('amount', 'desc')  // Order documents with bid amount greatest to least
            .limit(1)  // Just give me the first (largest) one.
            .onSnapshot( (snapshot) => {
                
                const newBidData = {};  // set as flag to tell that no bids existed/obtainable.

                if (snapshot.size === 1) {

                   newBidData = {
                       id: snapshot.docs[0].id,
                       ...snapshot.docs[0].data()
                   }

                }

                setHighestBid(newBidData);
            })
        
        // ...
        return;
    }, []);

    return highestBid;
}

