// updateActiveEvent
// Robert Ashley
// Mar 22, 2020
// Clears all events of 'isActive' properties and sets the desired property as 'active', all
// in one transaction.
import {loadDB} from '../../lib/db';
let db = loadDB().firestore();

export default (ref) => {
    let aucEventRef = db.collection('/AuctionEvent/').doc(ref);
    
    db.runTransaction(trans => {
        return trans.get(aucEventRef)
        .then( auctionEvents => {
            // Update all auctions with an isActive field
            console.log(trans)
            let removeActiveBatch = trans.batch();
            auctionEvents.docs.forEach( (doc) => {
                batch.update( '/AuctionEvent/' + doc.id, {isActive: false}); // or isActive: FieldValue.delete()
            });
            return removeActiveBatch.commit().then( (updResults) => {
                // Make sure the auction that the user wants to set active still exists
                trans.get('/AuctionEvent/' + auctionHubID).then( (newActiveEventDoc) => {
                    // Make sure the event still exists before we update it
                    if (newActiveEventDoc.exists) {
                        // Perform the update to the field and exit successfully.
                        trans.update('/AuctionEvent/' + newActiveEventDoc, {isActive: true});
                        Promise.resolve('Updating active event was successful');
                    }
                    else {
                        Promise.reject('Could not find event ' + auctionEventID);
                    }
                })
            })
        })
    }).then( results => {
        console.log('Transaction success: ', results);
    }).catch( (err) => {
        console.log('Transaction failure:', err);
    })
};