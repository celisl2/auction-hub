////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the timeEnd field from the front end to the database
//      Inputs  : The event id text and the timeEnd timestamp
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_event_timeEnd (eventId, eventTimeEnd) {
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


    // query the database using eventId and set timeEnd to eventTimeEnd
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}
