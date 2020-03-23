import {loadDB} from '../../lib/db';
let firebase = loadDB();
import "firebase/auth";
import Cookies from 'js-cookie';
import createUser from './createUser';

export default (req, res) => {

    //when user submits credentials through form - uses post
    if(req.method === 'POST') {

        const email = req.body.email;
        const password = req.body.password;
        let token = null;
        //do something

        //create account to firebase
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(cred => {
    cred.user.getIdToken().then(idToken => {
        createUser(cred.user.uid, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        emailVerified: false,
        isAdmin: req.body.isAdmin
      });

      if(idToken) {
        Cookies.set('ssid', Date.now());
      }

  });
})

.catch((error)=> {
  console.log(error.code);
  console.log(error.message);
});


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.sendEmailVerification();
                console.log("Sent Email Verification.");
            }

            else {
              console.log("Email Not sent.");
            }
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ token: "user added"}));

    } else {
        console.log(res);
        console.log('in else at api/login');
    }

};
