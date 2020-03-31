// /////////////////////////////////////////////////////////
//    
//    Filename:   placeBid.js
//    Programmer: Robert Ashley
//    Created:    25 Mar 2020
//    Purpose:    Perform the database query for an authorized user to place a bid
//                on a product in the active auction.
// Updates:
//  * 28 Mar 2020: (RTA) Revised for incorporation into UI, fixed bugs where bid would succeed because it defaulted to min bid amount as highest placed bid.
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
// OUTPUT
// Returns a boolean true on successful bid placement, 
export default async function placeBid (auctionEventID, productID, bidAmount, isBuyout=false, highestBidData) {
    return await doPlaceBid(auctionEventID, productID, bidAmount, highestBidData);
}
function executePlaceBid(auctionEventID, productID, bidAmount, userAccountID, isBuyout) {
    let bidData = {
        amount: bidAmount,
        timestamp: db.firestore.FieldValue.serverTimestamp(), // This sets time by Google Firestore's clock settings
        //userAccountID: userAccountID, // If you opt to not use user ids for bid document ids (so that you can track ALL bids), uncomment to track user as prop.
    };
    // Mark flag for buyout
    if (isBuyout) {
        bidData.isBuyout = true;
    }
    return db
        .firestore()
        .collection('/AuctionEvent/' + auctionEventID + '/AuctionProduct/' + productID + '/BidHistory')
        // If you wish to track ALL bids, use 'add' instead of set and do not designate doc. Track user id above.
        .doc(userAccountID)
        .set(bidData)
        .then( (bidSetResults) => {
            console.log("Bid placed in DB successfully by user ID " + userAccountID + " on product ID " + productID + " in auction ID " + auctionEventID + " for $" + bidAmount);
        })
        .catch( (bidSetError) => {
            console.error("Bid could not be placed in DB by user " + userAccountID + " on product ID " + productID + " in auction ID " + auctionEventID + " bidding $" + bidAmount + "\n Reason: " + bidSetError);
        })
}
//export default function placeBid (auctionEventID, productID, bidAmount) {
function doPlaceBid (auctionEventID, productID, bidAmount, isBuyout) {
    try {
        let numBidAmount = Number.parseFloat(bidAmount);
        let userAccountID = db.auth().currentUser.uid;
        // Need to amass following items:
        // * AuctionEvent: [startDate/Time, endDate/Time], isActive
        // * AuctionProduct: minBid, maxBid
        let auctionEventData = db.firestore().doc('/AuctionEvent/' + auctionEventID);
        let productData = db.firestore().doc('/AuctionEvent/' + auctionEventID + '/AuctionProduct/' + productID);
        auctionEventData.get()
        .then( (auctionDataSnap) => {
            if (auctionDataSnap.exists && auctionDataSnap.data().hasOwnProperty('isActive') && auctionDataSnap.data().isActive) {
                // Since this auction is enabled, user is eligible to bid on the product.
                // Need some more info from the product to continue. Namely, the bounds on bids.
                productData.get()
                .then( (productDataSnap) => {
                    console.log("DEBUG: " + productDataSnap.exists);
                    if(productDataSnap.exists && productDataSnap.data().hasOwnProperty('minBid') && productDataSnap.data().hasOwnProperty('maxBid')) {
                        var minimumBid = productDataSnap.data().minBid;
                        var maximumBid = productDataSnap.data().maxBid;
                        // If the user indicates they wish to buy out the product, set to maximum value (if not already set).
                        if (isBuyout) {
                            bidAmount = maximumBid;
                        }
                        // Finally, need to get the data for highest current bid, if any, so that we know if
                        // the user's bid is valid.
                       
                            // If there are previous bids, we need to know our bidder's proposal
                            // is higher than those bids already offered.
                            if ( typeof highestBidData !== "undefined" && highestBidData.hasOwnProperty('amount') ) {
                                // Place the bid knowing that bids have been placed before: minimum is above highest bid, exclusive.
                                console.log("DEBUG: bidding w/ existing bids...");
                                minimumBid = highestBidData.amount;
                                if (minimumBid < bidAmount && bidAmount <= maximumBid) {
                                    // We can place bid.
                                    return executePlaceBid(auctionEventID, productID, bidAmount, userAccountID, isBuyout)
                                }
                                else {
                                    console.error("Bid amount is not in valid range!");
                                    console.error("BidAmt: " + bidAmount + " MIN: " + minimumBid + " MAX:" + maximumBid);
                                    return false;
                                }
                            }
                            else {
                                // Place the bid knowing no bids have been placed before: minimum is product's mimimun, inclusive.
                                if (minimumBid <= bidAmount && bidAmount <= maximumBid) {
                                    // We can place bid.
                                    console.log("DEBUG: bidding w/O existing bids...");
                                    return executePlaceBid(auctionEventID, productID, bidAmount, userAccountID, isBuyout)
                                }
                                else {
                                    console.error("Bid amount is not in valid range!");
                                    return false;
                                }
                            }
                        
                    }
                    else {
                        console.error("Product data or the necessary properties could not be found.");
                        return false;
                    }
                })
                .catch( (productDataError) => {
                    console.error("[placeBid] Error: " + productDataError);
                })
            }
            else {
                console.error("You cannot bid in an event not configured as active!");
                return false;
            }
        })
        .catch( (auctionDataError) => {
            console.error("[placeBid] Error: " + auctionDataError);
        })
    }
    catch ( error ) {
        console.error("In [placeBid.js] an error occured: " + error);
        return false;
    }
}