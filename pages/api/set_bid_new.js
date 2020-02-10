////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/10/2020
// Description :
//      Summary : Create a new document in BidHistory by setting the amount, timestamp, and userAccountId fields from the front end to the database
//      Inputs  : The bid amount number, the bid timestamp timestamp, and the user id text
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
////////////////////////////////////////////////////////////////////////////////
function set_bid_new (bidAmount, bidTimestamp, userId) {
    // query the database and set amount to bidAmount, timestamp to bidTimestamp, and user_account_id to userId
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}
