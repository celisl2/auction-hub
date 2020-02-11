////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the productImage reference from the database to the front end
//      Inputs  : Text id of the specific AuctionProduct
//      Outputs : Reference value from the AuctionProduct productImage field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document names and field names
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_product_productImage (productId) {
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


    // query the database using productId and return just the productImage reference value
    // productImage = //query//
    // return productImage;
}
