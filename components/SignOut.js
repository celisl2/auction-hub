import {loadDB} from '../lib/db';
import "firebase/auth";
import Cookies from 'js-cookie';
import Router from 'next/router';

let firebase = loadDB();

function logOut() {
    firebase.auth().signOut().then(() => {
        //delete cookies
        Cookies.remove('ssid');
        Router.push('/login');
    }).catch((error) => {
        console.log(error);
    });
};

export default (url) =>
    <button onClick={logOut()}>
        Log Out
    </button>;



