/* /////////////////////////////////////////////////////////
//
// File Name: registration.js
// Purpose: Process the form data from the registration page.
// Document Created By: Laura Celis, Andy Estes, Nolan Worthy
//
///////////////////////////////////////////////////////// */

import {loadDB} from '../../lib/db';
let firebase = loadDB();
import "firebase/auth";
import createUser from './createUser';

export default (req, res) => {

    //when user submits credentials through form - uses post
    if(req.method === 'POST') {

        const email = req.body.email;
        const password = req.body.password;
        let token = null;

  //firebase command to create a user with credentials and process data.
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(cred => {
        cred.user.getIdToken().then(idToken => {
            createUser(cred.user.uid, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
            phone: req.body.phone
          });

        });
      })
      .catch((error)=> {
        console.log(error.code);
        console.log(error.message);
      });

        //Firebase command that checks if a user exists. If they do, then it was
        //sucessfuly created. Sends the console a notification. User notifications
        //Are handled in the registration page.
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user.emailVerified) {
                user.sendEmailVerification();
                console.log("Sent Email Verification.");
            }
            //If email did not send.
            else {
              console.log("Email Not sent.");
            }
        });

//Timeout for response time.
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ token: "user added"}));

    }
    else {
        console.log(res);
        console.log('in else at api/login');
    }

};
