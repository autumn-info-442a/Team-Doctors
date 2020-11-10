import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyAzlS4G0_AilAhMaLg1-Kqq5p6dEqI_2MU",
    authDomain: "info-442-1602963873043.firebaseapp.com",
    databaseURL: "https://info-442-1602963873043.firebaseio.com",
    projectId: "info-442-1602963873043",
    storageBucket: "info-442-1602963873043.appspot.com",
    messagingSenderId: "1017087285302",
    appId: "1:1017087285302:web:0a2d9a875812a2ecffe097",
    measurementId: "G-CDH98XSBFG"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();