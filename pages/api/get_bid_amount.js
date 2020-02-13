////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the amount number from the database to the front end
//      Inputs  : Text id of the specific product bid
//      Outputs : Number value from the bidHistory amount field
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_bid_amount (bidHistoryId) {
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



    var bidPath = '/AuctionEvent/vOwsw3o6VFijgeOEDKXM/AuctionProduct/lF49ndHaQI3CCwJ6E0tI/BidHistory/6yOVgNynlTu3aK6r7QhK';

    // query the database using bidHistoryId and return just the amount number value
    // READ DATA ONCE
    // Firebase App (the core Firebase SDK) is always required and
    // must be listed before other Firebase SDKs
    var firebase = require("firebase/app");

    // Add the Firebase products that you want to use
    require("firebase/auth");
    require("firebase/firestore");

    // work that needs to be done:
    //  narrow field to one field - amount
    //  save amount value to a variable
    //  return value

    let promise = new Promise((resolve, reject) => {

    })

    // // db.collection(bidHistoryId).get()
    // db.doc(bidPath).get()
    //     .then((snapshot) => {
    //         // snapshot.forEach(doc => {
    //             // console.log(doc.id, '=>', doc.data().amount); // print statement // remove once done
    //             // let amount = await doc.data().amount;
    //             // return doc.data().amount;
    //             return snapshot.data().amount;
    //         // });
    //     })
    //     .catch((err) => {
    //         console.log('Error getting documents', err); // print statement // remove once done
    //     });

    db.doc(bidPath).get()
    .then((snapshot) => {
        return snapshot.data().amount;
    })
    .catch((err) => {
        console.log('Error getting document', err);
    })

}

//testing function output
// console.log("\t" + get_bid_amount("6yOVgNynlTu3aK6r7QhK"))
path = '/AuctionEvent/vOwsw3o6VFijgeOEDKXM/AuctionProduct/lF49ndHaQI3CCwJ6E0tI/BidHistory'
console.log(get_bid_amount(path));
