import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAt2-NW2zrYMbIMDqVSrhIYp1q9JqiP5mY",
  authDomain: "madpropertypal-886ae.firebaseapp.com",
  databaseURL: "https://madpropertypal-886ae.firebaseio.com",
  projectId: "madpropertypal-886ae",
  storageBucket: "madpropertypal-886ae.appspot.com",
  messagingSenderId: "1030917654548",
  appId: "1:1030917654548:web:4473aefd71c63c66123f01",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
