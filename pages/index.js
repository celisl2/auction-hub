/*

File Name: index.js
Purpose: Home Page for the Application and prevents users who are not logged in.
Document Created By: Team 1

*/

import HomeAuth from '../components/HomeAuth';
import HomeForbidden from '../components/HomeForbidden';
import Loading from '../components/Loading';
import {loadDB} from '../lib/db';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import AdminHome from '../components/AdminHome';

let firebase = loadDB();

//This class renders a react component based on if the user is logged in or not
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: 'loading',
            role: null
        }
    }

    componentDidMount() {
        this._isMounted = true;

//Performs a check to determine whether or not a user is verified
        firebase.auth().onAuthStateChanged((user) => {
          //If user is verified and logged in do nothing.
            if(user) {
                if (user.emailVerified) {
                    console.log('Email is verified');
                    //User stays on index page
                }

                //Route user to verify if their email is unverified.
                else {
                    console.log('Email is not verified');
                    //Redirected to verify page if not verified
                    Router.push('/verify');
                }

                //Else user is routed to the login.js page.

                if(this._isMounted){
                    this.setState({ user });
                }
//Pulls the token from Firebase by using the User ID.
                user.getIdToken().then(function (token) {
                    Cookies.set('ssid', token);
                })

//Uses firestore to determine if a user is an admin or a regular user
                firebase.firestore()
                    .collection("/Users")
                    .doc(user.uid)
                    .get()
                    .then((querySnapshot) => {
                      //If admin then display admin homepage
                        if(querySnapshot.data().isAdmin == "true") {
                            this.setState({
                                role: "admin"
                            });
                        }

                        //Else display regular user homepage.
                        else {
                            this.setState({
                                role: "user"
                            });
                        };
                    })
            }
            else {
                if(this._isMounted)
                    this.setState(null);

                //Set a timer for redirecting a user.
                setTimeout(() => {
                    Router.push('/login');
                }, 4000);
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

//Build the page
    render() {
        //we check for state since every time state is changed the render function will be called again
        if(this.state.user === 'loading') {
            return (
            <Container>
                <Loading />
            </Container>
            );
        }
        //If a user is not logged in.
        else if(this.state.user === null) {
            return  (
                <Container>
                    <HomeForbidden />
                </Container>
            );
        }

        //If a user is an admin.
        else if (this.state.role == "admin") {
            return  (
                <AdminHome />
            );
        }

        //If a user is an normal user.
        else if (this.state.role == "user"){
            return  (
                <HomeAuth />
            );
        }
        else {
            return null;
        }
    }
};

export default Home;
