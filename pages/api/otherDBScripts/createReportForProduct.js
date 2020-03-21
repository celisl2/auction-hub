// /////////////////////////////////////////////////////////
//    
//    Filename:   createReportForProduct.js
//    Programmer: Robert Ashley
//    Created:    10 Mar 2020
//    Purpose:    Create a record of winning succession for a single product given the provided parameters.
//                Ideally, this would handle a product buyout or to be use iteratively at the end of an event.
//    Updated:    11 Mar 2020 (Robert Ashley) : Minor update for HTTP req/res


// Modifications to consider: redesign to call getHighestBid for data.
// /////////////////////////////////////////////////////////


import {loadDB} from '../../lib/db';
import "firebase/auth";
let firebase = loadDB();


// Convert for API request
export default (auctionEventId, productId) => {
//export default function (req, res) {

    //let auctionEventId = req.params.auctionEventId;
    //let productId = req.params.productId;

    if(firebase.auth().currentUser !== null) {
        
        // Obtain the Bid History for the product, sorted by highest bid to lowest bid
        firebase
        .firestore()
        .collection('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId + '/BidHistory')
        .orderBy('amount', 'desc')
        .get()
        .then( (bidHistorySnapshot) => {

            // Collect the ordered list of bid id's
            let currentBidWinner = bidHistorySnapshot.docs.map((bid) => ({
                id: bid.id,
                amount: bid.amount
            }));

            // We can opt to save a partial or whole array of bids here, or just ids, or eat the cost of the above read each time (likely bad).
            // Update the product document to which the bid history belongs, recording the succession of winners should a bidder not fufill their obligation.
            firebase
            .firestore()
            .doc('/AuctionEvent/' + auctionEventId + '/AuctionProduct/' + productId)
            .update({
                currentBidWinner: currentBidWinner, 
                winnerIndex: 0
            })
            .then( (results) => {
                console.log("Winner report created for product " + productId + ". Winner is currently user ID " + currentBidWinner[0])
                return true;
            })
            .catch( (errSave) => {
                console.error("In creating records tracking winner of product ID " + productId + ", an error occurred saving the records: " + errSave);
                return false;
            })
        })
        .catch( (errRequest) => {
            console.error("In requesting bid history of product ID " + productId + ", an error occurred: " + errRequest);
            return false;
        })

    }
    else {
        console.error("You are not authorized to view this page!");
        // Return to front end for login
    }

}