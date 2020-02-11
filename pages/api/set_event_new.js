////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Create a new document in AuctionEvent setting the location, name, timeEnd, and timeStart fields from the front end to the database
//      Inputs  : The event location text, name text, timeEnd timestamp and timeStart timestamp
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_event_new (eventLocation, eventName, eventTimeEnd, eventTimeStart) {
    // Import necessary modules
    var admin = require("firebase-admin");

    // Authenticate with firebase via service account.
    var serviceAccount = require("./auction-hub-firebase-firebase-adminsdk-omcxq-d2702ebfcf.json");

    // Initialize the authentication.
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://auction-hub-firebase.firebaseio.com"
    });

    // Shorthand access to database
    const db = admin.firestore();

    // The following stops some console log errors and warnings.
    db.settings({timestampInSnapshots: true});


    // query the database and set location to eventLocation, name to eventName, timeEnd to eventTimeEnd, and timeStart to eventTimeStart
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}
