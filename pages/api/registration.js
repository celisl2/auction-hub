import {loadDB} from '../../lib/db';
let firebase = loadDB();
import "firebase/auth";
import Cookies from 'js-cookie'
import Router from 'next/router';

export default (req, res) => {

    //when user submits credentials through form - uses post
    if(req.method === 'POST') {

        const email = req.body.email;
        const password = req.body.password;
        let token = null;
        //do something

        //create account to firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);
            //make sure token exists
            cred.user.getIdToken().then(idToken => {
                //this returns token -> when signed in
                console.log('**** TOKEN HERE ****' + idToken);
                if(idToken) {
                    Cookies.set('ssid', Date.now());
                    firebase.auth().onAuthStateChanged(function(user) {
                        user.sendEmailVerification();
                        console.log('Email verification has been sent.')

                        });
                }
            });
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        //res.end(JSON.stringify({ token: "user added"}));
    } else {
        console.log(res);
        console.log('in else at api/login');
    }

};
