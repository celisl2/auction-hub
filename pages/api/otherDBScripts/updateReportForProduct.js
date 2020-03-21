// /////////////////////////////////////////////////////////
//    
//    Filename:   updateReportRemainingProducts.js
//    Programmer: Robert Ashley
//    Created:    10 Mar 2020
//    Purpose:    Iteratively add data for generating reports for all products.
//    Updated:    18 Mar 2020 Robert Ashley: finished syntax. Still needs verification.
// /////////////////////////////////////////////////////////

import {loadDB} from './../../lib/db'
    let firebase = loadDB();


import createReportForProduct from './createReportForProduct'
//import readOffsetFromHighestBid from './readOffsetFromHighestBid'

/*
static async function getProductData(auctionEventId, productId) {
    //get auction from api
   const res = await fetch('http://localhost:3000/api/readAuctionEvents', {
       method: 'POST',
       body: {auctionEventId: auctionEventId}
   });
   const json = await res.json();
   return {
       apiData: {
           auctionEvent: json
       }
   }
}
*/

// This function assumes the existing index of the "highest bid" is known, and is being passed
// this and the offset desired (usually +1 or -1)


static async function getOffsetHighestReport (auctionEventId, productId, index, offset) {

}

//export default function (req, res) {
export default function createReportForRemainingProducts (auctionEventId, productId, offset) {
    //let auctionEventId = req.params['auctionEventId'];
    //let productId = req.params['productId'];
    //let index = req.params['index'];
    //let offset = req.params['offset'];
    
    getOffsetHighestReport(auctionEventId, productId, offset)
    .then( (prodData) => {
        // With the new product offset
    })
    .catch( (error) => {
        console.error("Could not retrieve data for product id " + prod.id + " under auction event " + auctionEventId);
    })

}