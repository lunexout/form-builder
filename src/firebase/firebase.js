import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBnGXUvJaNfEa_g6jEDBRLNRlkQh75Wshg",
  authDomain: "form-builder-19d10.firebaseapp.com",
  projectId: "form-builder-19d10",
  storageBucket: "form-builder-19d10.appspot.com",
  messagingSenderId: "788128615898",
  appId: "1:788128615898:web:fcf08b72186f67fc2cc4e3",
  measurementId: "G-LZ73TJVGWF"
};

firebase.initializeApp(firebaseConfig)
export default firebase;
