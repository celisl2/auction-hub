/* /////////////////////////////////////////////////////////
//
//    Filename:   login.js
//    Programmer: Nolan Wlorthy
//    Created:    17 Feb 2020
//    Updated:    4 April 2020
//
///////////////////////////////////////////////////////// */

import {loadDB} from '../../lib/db';
let firebase = loadDB();
import "firebase/auth";
import Cookies from 'js-cookie';


export default (req, res) => {

    //when user submits credentials through form - uses post
    if(req.method === 'POST') {
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then(() => {
                Cookies.set('ssid', Date.now());
                console.log('logged in fine from firebase')
            })

            //catch errors when logging in.
            .catch((error) => {
                let errorCode = error.code;
                    if(errorCode == 'invalid-email') {
                        Cookies.set('logInError', 'Email address not valid');
                    } else if(errorCode == 'user-disabled') {
                        Cookies.set('logInError', 'Your account has been disabled. Please contact an adiministrator');
                    } else if(errorCode == 'user-not-found') {
                        Cookies.set('logInError', 'There is no account associated with this email. Please create an account or double check the email entered.');
                    } else if( errorCode == 'wrong-password') {
                        Cookies.set('logInError', 'Incorrect password. Please enter a valid passoword associated with that email.');
                    } else {
                        console.log(error);
                    }
            });


            //If the user signed in sucessfully
            console.log('I GUESS SIGNED IN FINE LOL ' + Cookies.get('ssid'));

            //Timeout code for response
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end();
    } else {
        console.log(res);
        console.log('in else at api/login');
    }

};
