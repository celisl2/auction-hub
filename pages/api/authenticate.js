////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/6/2020
// Description : THIS IS THE AUTHENTICATION FOR THE TEST DATABASE - CHANGE AT A LATER DATE.
//      Summary : Grant access to the firebase-auction-hub database to the scope
//      Inputs  : no inputs
//      Outputs : no outputs
////////////////////////////////////////////////////////////////////////////////
function authenticate () {
    // Import necessary modules
    var admin = require("firebase-admin");
    var crypto = require('crypto');

    // Authenticate with firebase via service account.
    // I'm not sure about node applications running on Firebase itself.
    // Replace the below with the service credentials provided on Firebase
    var serviceAccount = require("./Credentials/fir-testing-bd63e-firebase-adminsdk-cl9gh-1d1e237b01.json");

    // Initialize the authentication.
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://fir-testing-bd63e.firebaseio.com"
    });

    // Shorthand access to database
    const db = admin.firestore();

    // The following stops some console log errors and warnings.
    db.settings({timestampInSnapshots: true});
}
