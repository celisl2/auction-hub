/* /////////////////////////////////////////////////////////
//
//    Filename:   createAuctiontQuery.js
//    Programmer: Robert Ashley
//    Created:    24 Feb 2020
//    Updated:
//
///////////////////////////////////////////////////////// */



import {loadDB} from '../../lib/db';

/*
function createAuctionEvent (EventData) {

    // To Do: Add an authentication check to assure user has privelleges to create auction events.

    // To Do | Critical: do preprocessing to assure data types are correct (e.g. date and time.)
    loadDB()
        .firestore()
        .collection("/AuctionEvent")
        .add(EventData)
        .then( (results) => {
            //console.log("DEBUG:: Auction event creation successful: Auction ID " + results.id);
            alert("DEBUG:: Auction event creation successful: Auction ID " + results.id)

            return results;
        })
        .catch( (error) => {
            alert("DEBUG:: Auction event creation unsuccessful\nError: " + error.code + " : " + error.message);
            return error;
        })

}
*/

//Pricess POST Data
export default (req, res) => {
    if(req.method === 'POST') {
        ///console.log(req.body)

        //access EventData
        let EventData = req.body;
        loadDB()
        .firestore()
        .collection("/AuctionEvent")
        .add(EventData)
        .then( (results) => {
            //console.log("DEBUG:: Auction event creation successful: Auction ID " + results.id);
            //alert("DEBUG:: Auction event creation successful: Auction ID " + results.id)

            //Tiemout code for response
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({token: true});
            //return results;
        })

        //catch error if auction event could not be created.
        .catch( (error) => {
            //alert("DEBUG:: Auction event creation unsuccessful\nError: " + error.code + " : " + error.message);
            console.error("Auction event creation unsuccessful\nError: " + error.code + " : " + error.message)
            res.statusCode = 500;

            res.setHeader('Content-Type', 'application/json');
            res.json({token: false});
            //return error;
        })
    }
}


//export default createAuctionEvent;
