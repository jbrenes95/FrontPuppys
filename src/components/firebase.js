import  firebase  from 'firebase/app'
import '@firebase/auth'
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyA3yana-qlV81HyzEDzNlYRd-SOc2UBKuE",
    authDomain: "authpuppys.firebaseapp.com",
    databaseURL: "https://authpuppys.firebaseio.com",
    projectId: "authpuppys",
    storageBucket: "authpuppys.appspot.com",
    messagingSenderId: "1083055801688",
    appId: "1:1083055801688:web:8e7f086796e7eaabf8512d",
    measurementId: "G-LB2RQDS1FB"
};

 firebase.initializeApp(firebaseConfig);


export default   firebase ;