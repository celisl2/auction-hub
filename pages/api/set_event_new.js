////////////////////////////////////////////////////////////////////////////////
// Author : Cashton Christensen
// Date Last Modified : 2/10/2020
// Description :
//      Summary : Create a new document in AuctionEvent setting the location, name, timeEnd, and timeStart fields from the front end to the database
//      Inputs  : The event location text, name text, timeEnd timestamp and timeStart timestamp
//      Outputs : Boolean value: True = successful, False = unsuccessful - option to change depending on needs
////////////////////////////////////////////////////////////////////////////////
function set_event_new (eventLocation, eventName, eventTimeEnd, eventTimeStart) {
    // query the database and set location to eventLocation, name to eventName, timeEnd to eventTimeEnd, and timeStart to eventTimeStart
    // error handling - return true if successful, false if unsuccessful
    // possible changes: return specific messages that indicate possible errors instead of boolean values
}
