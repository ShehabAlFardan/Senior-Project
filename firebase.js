// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import {getFirestore} from 'firebase/firestore'
import firestore from '@react-native-firebase/firestore';

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRFTcjOfnr1KrgfEg6biQWlD0_J9B9sm8",
  authDomain: "seniorproject-a0885.firebaseapp.com",
  projectId: "seniorproject-a0885",
  storageBucket: "seniorproject-a0885.appspot.com",
  messagingSenderId: "650107873869",
  appId: "1:650107873869:web:faadd179b0b181cc464a04",
  measurementId: "G-98NETV57JX"
};

// Initialize Firebase
let app;
if (firebase.apps.length ===0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth();
export{auth}
export default firebase; 
export const db = getFirestore(app)
export {firestore}
