import {loadDB} from '../../lib/db';
let firebase = loadDB();

export default (req, res) => {

    //when user submits credentials through form - uses post
    if(req.method === 'POST') {

        const email = req.body.email;
        const password = req.body.password;
        //do something

        firebase.auth().createUserWithEmailAndPassword(body.email, body.password).then(cred => {
            console.log(cred.user);
        })


        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ token: "user added"}));
    } else {
        console.log(res);
        console.log('in else at api/login');
    }

};
