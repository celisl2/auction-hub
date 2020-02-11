////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the timestamp timestamp from the database to the front end
//      Inputs  : Text id of the specific product bid
//      Outputs : Timestamp value from the bidHistory timestamp field
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_bid_timestamp (bidHistoryId) {
    // Import necessary modules
    var admin = require("firebase-admin");

    // Authenticate with firebase via service account.
    var serviceAccount = require("path/to/serviceAccountKey.json");

    // Initialize the authentication.
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://auction-hub-firebase.firebaseio.com"
    });

    // Shorthand access to database
    const db = admin.firestore();

    // The following stops some console log errors and warnings.
    db.settings({timestampInSnapshots: true});


    // query the database using bidHistoryId and return just the timestamp timestamp value
    // timestamp = //query//
    // return timestamp;
}
