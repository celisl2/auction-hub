import {loadDB} from '../../lib/db';
let firebase = loadDB();

export default (req, res) => {
    console.log(firebase.auth());
    
    if(firebase.auth().currentUser !== null) {
        //read db data
        //* let userId = firebase.auth().currentUser.uid;
        //* https://firebase.google.com/docs/database/web/read-and-write
    }
    else {
        //return message for front end to display and inform user they need to login
    }

};