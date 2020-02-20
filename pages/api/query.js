{
  "type": "service_account",
  "project_id": "auction-hub-firebase",
  "private_key_id": "d2702ebfcfea80386152caeda6401b5e6781cebb",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEU5TxbMdEGpGx\n4cNHGlvAfY6PwTqOHxx7llY4+OWV06B816HT+Nfh85mfNK8OP7oKuMid0xfqJaQl\nJ42lD1hC4FPAcPjN6y/XrWUWs9Ox82ewFWho8F7fMwNi+57KxN2ielDGFxWqsYN7\nxW/BTMKgWOX5BzOJlqgyvI1TUZ5Nb4kMvRcu1cwJ/byJXr72UT5+RZ3z+XwM1zp7\nU9ITmkK8VvrZmwm30QZhT4/nzIF2EsUBTEcPIa1zKTmBoh+7wtZpFvOx5dFz7c13\nuumr4yW9Iz4DM8hElnGtpgLqGnCAi2gHi3U9RtKCvjc5SbQNaQpga259tBT+j2la\nqeASg/UpAgMBAAECggEAAYV7y6CqDSgvDZu4J5CH2j6m2IyY63HIhtkoByY/ojj6\n/witQX8lziOVAs+11RSPmKZssJNqlacPxfVv4rHzH0aNg5nkhbT/QIrAlCvV1cTS\n/oF19w040P48Vhuo0/2xUYFk55oVcgaQ5ChIKM1zWyqBMrw4bSYonMcLCdSht0wk\n23NlpYFmdk6iRBgVRU5/zNbKSAps/2ET/43aAQsjErXC73rNMiQPG7xsuPzTcqj5\nBxjJXDZoPhc9Pr5fhaBUdeB6FllDM8FKlH41jC/RCcY0iVLU2F2BIv6NJFVWfoMM\nCFzeC8kBd/eSskpvA12NgAmA4BVPLW8szVZvMG0OsQKBgQD4/FizCyLR/OT9YaK9\nVv3W3jkplTC23wpej8KsDkmN51K0pGww2wyMsxeQFWtM8uiM0g1fhCNJSB79fhl4\nL28QFP3CRKA9mTfpxvK9bqQKC5zTMrMZ4CzYfdArSD/aWnTPDGzpsrh9L/j/cysB\nnpp/S2cCWQK+fDk3Zo2852MssQKBgQDJ23atZ0hiWapiKsWWsOUWbUgwJ7y3amAb\nTV4VQCgB97D3xIgqnL/QKtTIe3e7Os8kTVS6DUjjkhEPGRX5BG5yPC/k1aAH59HC\nR3n1uiITBAFgp93I0b5XuPid6ZEUnij5LRJeGU4gaR355/PTG+snS7TDDNiF9QWd\ngE8ItnCN+QKBgQClNtUooSgOzM+p7oKNPs8bJ8Qoeo2jmuaHjr8vah+WoLt5kG0W\nEhQGvMPS4NOdcMWsw6kKC2VauBeQP39pB5ibxEIKCX2GwkeewVvLJUKGQ+RhJBBC\nCEXZtcpPHhb4rfM6fFU80VGoCBAieWo9HeAIvaDxptyyRz20LEG66pMdUQKBgFwB\nEsugisaBFf7efebcQ95/+uowAn0bGCj5j4tiDZov+lJEGshJX8gS7Z9fX0hQWr+y\nG48dpP5Mwke+aFxy36BjvHSxxdo0mE/T4kvVBdji93nFqXnx168GGRNotP7Pw98m\n4vtOz2RIZShVx7WOQRVNFVvdzAbqkh+iruNKvGyJAoGAcKMzgasN1yg4RxR2bQtW\nTOtPmj67dqdDqadqrUiU5fQ+a5XBzo0GYEApUzFvwd9cOHiXGzb/sYRMZdzgn3qP\ncEby9czDL23LYbdbsjMNCiQuNLHmH6rBKNmP/pZmQPrVPcmMPqGsjUrcGyHi8Zh7\nxvk33Z82xCB/whY0e8XOjLE=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-omcxq@auction-hub-firebase.iam.gserviceaccount.com",
  "client_id": "102791109946356474571",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-omcxq%40auction-hub-firebase.iam.gserviceaccount.com"
}


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

    // Authenticate with firebase via service account.
    // I'm not sure about node applications running on Firebase itself.
    // Replace the below with the service credentials provided on Firebase
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
}
//TEST FIREBASE - DELETE LATER
// var admin = require("firebase-admin");
//
//
// var serviceAccount = require("./Credentials/fir-testing-bd63e-firebase-adminsdk-cl9gh-1d1e237b01.json");
//
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://fir-testing-bd63e.firebaseio.com"
// });


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

    db.doc(bidPath).get()
    .then((snapshot) => {
        return snapshot.data().amount; // THE FUNCTION ISN'T WAITING FOR THIS TO FINISH BEFORE RUNNING THE CONSOLE.LOG TEST CASE
    })
    .catch((err) => {
        console.log('Error getting document', err);
    })

}

//testing function output
// console.log("\t" + get_bid_amount("6yOVgNynlTu3aK6r7QhK"))
// path = '/AuctionEvent/vOwsw3o6VFijgeOEDKXM/AuctionProduct/lF49ndHaQI3CCwJ6E0tI/BidHistory'
// console.log(get_bid_amount(path));


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


    // query the database using bidHistoryId and return just the timestamp timestamp value
    // timestamp = //query//
    // return timestamp;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the userAccountId text from the database to the front end
//      Inputs  : Text id of the specific product bid
//      Outputs : Text value from the BidHistory usesrAccountId field
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_bid_userAccountId (bidHistoryId) {
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


    // query the database using bidHistoryId and return just the usesrAccountId text value
    // userAccountId = //query//
    // return userAccountId;
}



////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the location text from the database to the front end
//      Inputs  : Text id of the specific AuctionEvent
//      Outputs : Text value from the AuctionEvent location field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document name
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_event_location (eventId) {
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


    // query the database using eventId and return just the location text value
    // location = //query//
    // return location;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the name text from the database to the front end
//      Inputs  : Text id of the specific AuctionEvent
//      Outputs : Text value from the AuctionEvent name field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document name
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_event_name (eventId) {
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


    // query the database using eventId and return just the name text value
    // name = //query//
    // return name;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the time_end timestamp from the database to the front end
//      Inputs  : Text id of the specific AuctionEvent
//      Outputs : Timestamp value from the AuctionEvent timeEnd field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document names and field names
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_event_timeEnd (eventId) {
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


    // query the database using eventId and return just the timeEnd timestamp value
    // timeEnd = //query//
    // return timeEnd;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the time_start timestamp from the database to the front end
//      Inputs  : Text id of the specific AuctionEvent
//      Outputs : Timestamp value from the AuctionEvent timeStart field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document names and field names
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_event_timeStart (eventId) {
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


    // query the database using eventId and return just the timeStart timestamp value
    // timeStart = //query//
    // return timeStart;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/10/2020
// Description :
//      Summary : Return the bid number from the database to the front end
//      Inputs  : Text id of the specific AuctionProduct
//      Outputs : NUMBER value from the AuctionProduct bid field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document name
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_product_bid (productId) {
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


    // query the database using productId and return just the bid NUMBER value
    // bid = //query//
    // return bid;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the buyoutPrice number from the database to the front end
//      Inputs  : Text id of the specific AuctionProduct
//      Outputs : NUMBER value from the AuctionProduct buyoutPrice field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document names and field names
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_product_buyoutPrice (productId) {
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


    // query the database using productId and return just the buyoutPrice number value
    // buyoutPrice = //query//
    // return buyoutPrice;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the description text from the database to the front end
//      Inputs  : Text id of the specific AuctionProduct
//      Outputs : Text value from the AuctionProduct description field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document name
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_product_description (productId) {
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


    // query the database using productId and return just the description text value
    // description = //query//
    // return description;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Return the name text from the database to the front end
//      Inputs  : Text id of the specific AuctionProduct
//      Outputs : Text value from the AuctionProduct name field
//
// Modfied by Cashton Christensen : 2/10/20
//      updated database document name
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function get_product_name (productId) {
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


    // query the database using productId and return just the name text value
    // name = //query//
    // return name;
}


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


    // query the database using productId and return just the productImage reference value
    // productImage = //query//
    // return productImage;
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Create a new document in BidHistory by setting the amount, timestamp, and userAccountId fields from the front end to the database
//      Inputs  : The bid amount number, the bid timestamp timestamp, and the user id text
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_bid_new (bidAmount, bidTimestamp, userId) {
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


    // query the database and set amount to bidAmount, timestamp to bidTimestamp, and user_account_id to userId
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the event location field from the front end to the database
//      Inputs  : The event id text and the location text
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_event_location (eventId, eventLocation) {
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


    // query the database using eventId and set location to eventLocation
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the event name field from the front end to the database
//      Inputs  : The event id text and name text
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_event_name (eventId, eventName) {
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


    // query the database using eventId and set name to eventName
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


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


    // query the database using eventId and set timeEnd to eventTimeEnd
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the timeStart field from the front end to the database
//      Inputs  : The event id text and timeStart timestamp
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_event_timeStart (eventId, eventTimeStart) {
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


    // query the database using eventId and set timeStart to eventTimeStart
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the bid field from the front end to the database
//      Inputs  : The product id and the product bid amount number
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_product_bid (productId, productBid) {
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


    // query the database using productId and set bid to productBid
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the buyoutPrice field from the front end to the database
//      Inputs  : The product id and the product buyoutPrice number
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_product_buyoutPrice (productId, productBuyoutPrice) {
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


    // query the database using productId and set buyoutPrice to productBuyoutPrice
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the description field from the front end to the database
//      Inputs  : The product id and the product description text
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_product_description (productId, productDescription) {
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


    // query the database using productId and set description to productDescription
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the productImage field from the front end to the database
//      Inputs  : The product id and the product image reference
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_product_image (productId, productImage) {
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


    // query the database using productId and set productImage to productImage
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Set the name field from the front end to the database
//      Inputs  : The product id and the product name text
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_product_name (productId, productName) {
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


    // query the database using productId and set name to productName
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}


////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/11/2020
// Description :
//      Summary : Create a new document in AuctionProduct by setting the bid, buyoutPrice, description, name, and productImage fields from the front end to the database
//      Inputs  : The product bid amount number, the buyout price number, the description text, the name text, and the image reference
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
//
// Modfied by Cashton Christensen : 2/11/20
//      added firestore authentication code
////////////////////////////////////////////////////////////////////////////////
function set_product_new (productBid, productBuyoutPrice, productDescription, productName, productImage) {
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


    // query the database and set bid to productBid, buyout_price to productBuyoutPrice, description to productDescription, name to productName, productImage to productImage
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}
