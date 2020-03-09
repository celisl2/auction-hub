// /////////////////////////////////////////////////////////
//    
//    Filename:   readHighestBid.js
//    Programmer: Robert Ashley
//    Created:    9 March 2020
//    Purpose: Retrieves the one bid, if it exists, for the given auction and product
//
// /////////////////////////////////////////////////////////


import {loadDB} from '../../lib/db';

export default (req, res) => {
  
    if(firebase.auth().currentUser !== null) {

        try {
            if (req.method === 'POST') {
                let auctionEventId = req.params.auctionEventId;
                let productId = req.params.productId;
                let bidId = req.params.bidId;
    
                loadDB()
                    .firestore()
                    .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')
                    .orderBy('amount', 'desc')  // Order documents with bid amount 
                    .limit(1)
                    .onSnapshot( (snapshot) => {

                        let newBidData = {};  // set as flag to tell that no bids existed/obtainable.

                        if (snapshot.size === 1) {
                            newBidData = {
                                id: snapshot.docs[0].id,
                                ...snapshot.docs[0].data()
                            }
                            if (newBidData.hasOwnProperty("timestamp")) {
                                newBidData.timestamp = newBidData.timestamp.toDate();
                            }

                            res.setHeader('Content-Type', 'application/json');
                            res.json(productData);
                            res.status(200).end();
                        }
                        else {
                            throw "Incorrect quantity of elements returned by Firebase Firestore.";
                        }
                        
                    })
            }
            else {
                console.error("Please request via POST!");
            }

        }
        catch (err) {
            res.status(500).end();
            console.error(e.stack);
        }
        
    }
    else {
        console.error("You are not authorized to view this page!");
        // Return to front end for login
    }

};