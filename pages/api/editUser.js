import {loadDB} from '../../lib/db';

function editUser (userID, userData) {

    loadDB()
        .firestore()
        .collection("/Users")
        .doc(userID)
        .set(userData)
        .then( (results) => {
            //console.log("DEBUG:: Product creation successful: Product ID " + results.id);
            alert("DEBUG:: User edit successful: User ID " + results.id);
            return results;
        })
        .catch( (error) => {
            alert(userID + "DEBUG:: User edit unsuccessful\n" + error.code + " : " + error.message);
            return error;
        })
}


export default editUser;
