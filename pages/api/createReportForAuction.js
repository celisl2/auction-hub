// createReportForAuction

import { loadDB } from '../../lib/db';
    let db = loadDB()

    // Input: auctionID: Firestore document ID corresponding to the AuctionEvent for which to create a report
    // Output: In Firestore database, creates an 'AfterEventReport' collection under the auction event with aggregated data.

    // RTA: Please verify: returns a promise -- use .then/.catch to handle details.

export default function generateReportsForAuction (auctionID) {

    // Load Product Data
    db
    .firestore()
    .collection('/AuctionEvent/' + auctionID + '/AuctionProduct')
    .get()
    .then( productSnapshot => {
        if (!productSnapshot.size) {
            console.log( "No products were obtained from the database! No reports will be created." );
            return;
        }

        // Keep track of all of the product gets as we go along.
        let promiseAllProductReports = []

        productSnapshot.docs.forEach( (product) => {
            // Collect the bid history data for each product with its id for reference.
            let transferProductBidData = db
            .firestore()
            .collection('/AuctionEvent/' + auctionID + '/AuctionProduct/' + product.id + '/BidHistory')
            .orderBy('amount', 'desc')
            .get()
            .then( (bidDataSnapshot) => {
                let bidData = []
                if (!!bidDataSnapshot.size) {
                    bidData = bidDataSnapshot.docs.map( (bid) => {
                        return  {
                            id: bid.id,
                            ...bid.data(),
                        }
                    })
                }

                // Save the data to /AfterEventReport for future use
                // Products without bids are left with empty array.
                db
                    .firestore()
                    .doc('/AuctionEvent/' + auctionID + '/AfterEventReport/' + product.id)
                    .set( {bidList:bidData, ...product.data()}, {merge: true})
                    .then( (updSuccess) => {
                        console.log("Consolidated report data for product " + product.id);
                    })
                    .catch( (updErr) => {
                        console.error("Error in (createReportForAuction) updating report: " + updErr);
                    })

            })
            .catch( (bidDataErr) => {
                console.error("Error in (createReportForAuction) getting bid data: " + bidDataErr);
            })

            promiseAllProductReports.push(transferProductBidData);
        })

        // Continue here only wnen all products and bids are successfully obtained.
        Promise.all(promiseAllProductReports)
        .then( (success) => {
            Promise.resolve("After Event Report for auction ID " + auctionID + " was created successfully!" );
        } )
        .catch( (failure) => {
            Promise.reject("After Event Report for all product could not be created. Cause: " + failure);
        })

    }) 
    .catch( (prodErr) => {
        console.error("Error in (createReportForAuction) getting product data: " + prodErr);
    })
    

}