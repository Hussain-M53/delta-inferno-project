// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ-wsDo2jVgcsey491Xhf5Tx8Zf_2MceI",
  authDomain: "delta-inferno-project.firebaseapp.com",
  projectId: "delta-inferno-project",
  storageBucket: "delta-inferno-project.appspot.com",
  messagingSenderId: "311579549598",
  appId: "1:311579549598:web:c66a6e31960f4354ee408f",
  measurementId: "G-7KHB16BGVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Use this at the time of deploy
// firebase login
// firebase init
// firebase deploy