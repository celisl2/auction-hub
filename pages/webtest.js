
import Navigation from '../components/Navigation';
import {getCode} from '../utils/helperFunctions';

let Login = () =>
<script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
<script src="bower_components/firebaseui/dist/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="bower_components/firebaseui/dist/firebaseui.css" />


var ui = new firebaseui.auth.AuthUI(firebase.auth());
var firebase = require('firebase');
var firebaseui = require('firebaseui';

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});

<p>
  <button id="sign-out">Sign Out</button>
  <button id="delete-account">Delete account</button>
</p>

</html>
export default Login
