// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBF1semDtZRNjoVOUxJGztUNMWD3v2-fOg",
    authDomain: "notes-management-c4d92.firebaseapp.com",
    projectId: "notes-management-c4d92",
    storageBucket: "notes-management-c4d92.appspot.com",
    messagingSenderId: "198076602033",
    appId: "1:198076602033:web:23fda2ee17c72a38c23490"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { auth, provider, db }