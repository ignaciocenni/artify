// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5kwLH9azXNmb7xLX-ggKhG8RYHpQaPjE",
  authDomain: "artify-392521.firebaseapp.com",
  projectId: "artify-392521",
  storageBucket: "artify-392521.appspot.com",
  messagingSenderId: "568320990978",
  appId: "1:568320990978:web:d6c9951bbc4e7f537eec1b",
  measurementId: "G-Y5B2G9MT67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);