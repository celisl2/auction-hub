// /////////////////////////////////////////////////////////
//    
//    Filename:   createReportRemainingProducts.js
//    Programmer: Robert Ashley
//    Created:    10 Mar 2020
//    Purpose:    Iteratively add data for generating reports for all products.
//    Updated:    18 Mar 2020 Robert Ashley: finished syntax. Still needs verification.
// /////////////////////////////////////////////////////////

import {loadDB} from './../../lib/db'
    let firebase = loadDB();


import createReportForProduct from './createReportForProduct'


static async function getProductData(auctionEventId) {
    //get auction from api
   const res = await fetch('http://localhost:3000/api/readAuctionProducts', {
       method: 'POST',
       body: {auctionEventId: auctionEventId}
   });
   const json = await res.json();
   return {
       auctionProducts: json
   }
}

//export default function (req, res) {
export default function createReportForRemainingProducts (auctionEventId) {
    //let auctionEventId = req.params.auctionEventId;
    
    getProductData
        .then( (prodData) => {
            // We have the list of products -- for each that does not have the proper prop, create the auction report
            prodData.foreach( (prod) => {
                if (!prod.hasOwnProperty('currentBidWinner')) {
                    // The product has not had a report generated as of yet. Create it now:

                    if (createReportForProduct(auctionEventId, prod.id)) {
                        console.log("Product Report created for product id " + prod.id + " under auction event " + auctionEventId);
                    }
                    else {
                        console.error("It was indicated that product id " + prod.id + " under auction event " + auctionEventId + " needed a report but it couldn't be generated. Check into the problem!");
                    }                    
                }
            })
        })
        .catch( (error) => {
            console.error("createReportRemainingProducts: " + error);
            return false;
        })

        return true;


}