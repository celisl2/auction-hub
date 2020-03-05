import {loadDB} from '../lib/db';
import "firebase/auth";
import Cookies from 'js-cookie';
import Router from 'next/router';
const React = require('react')
import Button from 'react-bootstrap/Button';

let firebase = loadDB();

const SignOut = () => {
    return (
        <Button variant="dark" onClick={ function () {
            firebase.auth().signOut().then(() => {
            //delete cookies
            Cookies.remove('ssid');
            Router.push('/login');
        }).catch((error) => {
            console.log(error);
        })
        }}>
            Log Out
        </Button>
    );
};

export default SignOut;
