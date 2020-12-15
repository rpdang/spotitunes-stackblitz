import firebase from "firebase/app";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyBQL4cCF7vIo46rMRdgvW-Qbpkl-5ywsuk",
  authDomain: "spotitunes-a0f57.firebaseapp.com",
  databaseURL: "https://spotitunes-a0f57.firebaseio.com",
  projectId: "spotitunes-a0f57",
  storageBucket: "spotitunes-a0f57.appspot.com",
  messagingSenderId: "296471839301",
  appId: "1:296471839301:web:fd4dbed664766c0654592c",
  measurementId: "G-22DJRN4NCR",
};

export default class Firebase {
  constructor() {
    firebase.initializeApp(config);
    firebase.auth().signInAnonymously();
  }
}
