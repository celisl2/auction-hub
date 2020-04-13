/* /////////////////////////////////////////////////////////
//
//    Filename:   createUser.js
//    Programmer: Nolan Worthy
//    Created:    5 Mar 2020
//    Updated:    4 April 2020
//
///////////////////////////////////////////////////////// */

import {loadDB} from '../../lib/db';

function createUser (userID, userData) {

    loadDB()
        .firestore()
        .collection("/Users")
        .doc(userID)
        .set(userData)
        .then( (results) => {
            //console.log("DEBUG:: Product creation successful: Product ID " + results.id);
            alert("DEBUG:: User creation successful: User ID " + results.id);
            return results;
        })
        .catch( (error) => {
            alert(userID + "DEBUG:: User creation unsuccessful\n" + error.code + " : " + error.message);
            return error;
        })
}


export default createUser;
