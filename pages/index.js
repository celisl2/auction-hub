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

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                if (user.emailVerified) {
                    console.log('Email is verified');
                }
                else {
                    console.log('Email is not verified');
                    Router.push('/verify');
                }

                if(this._isMounted){
                    this.setState({ user });
                }

                user.getIdToken().then(function (token) {
                    Cookies.set('ssid', token);
                })

                firebase.firestore()
                    .collection("/Users")
                    .doc(user.uid)
                    .get()
                    .then((querySnapshot) => {
                        if(querySnapshot.data().isAdmin == "true") {
                            this.setState({
                                role: "admin"
                            });
                        }
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

                setTimeout(() => {
                    Router.push('/login');
                }, 4000);
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        //we check for state since every time state is changed the render function will be called again
        if(this.state.user === 'loading') {
            return (
            <Container>
                <Loading />
            </Container>
            );
        }
        else if(this.state.user === null) {
            return  (
                <Container>
                    <HomeForbidden />
                </Container>
            );
        }
        else if (this.state.role == "admin") {
            return  (
                <AdminHome />
            );
        }
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
