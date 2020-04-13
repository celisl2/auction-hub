/* /////////////////////////////////////////////////////////
//
//    Filename:   editUser.js
//    Programmer: Nolan Worthy
//    Created:    17 Feb 2020
//    Updated:    4 April 2020
//
///////////////////////////////////////////////////////// */

import {loadDB} from '../../lib/db';

function editUser (userID, userData) {

//Loads user data from firestore database
    loadDB()
        .firestore()
        .collection("/Users")
        .doc(userID)
        .set(userData)
        .then( (results) => {
          //If user editign was sucessful
            //console.log("DEBUG:: Product creation successful: Product ID " + results.id);
            alert("DEBUG:: User edit successful: User ID " + results.id);
            return results;
        })
        //If an error occurs
        .catch( (error) => {
            alert(userID + "DEBUG:: User edit unsuccessful\n" + error.code + " : " + error.message);
            return error;
        })
}


export default editUser;
