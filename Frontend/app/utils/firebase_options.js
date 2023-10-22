import { initializeApp, } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ-wsDo2jVgcsey491Xhf5Tx8Zf_2MceI",
  authDomain: "delta-inferno-project.firebaseapp.com",
  projectId: "delta-inferno-project",
  storageBucket: "delta-inferno-project.appspot.com",
  messagingSenderId: "311579549598",
  appId: "1:311579549598:web:c66a6e31960f4354ee408f",
  measurementId: "G-7KHB16BGVK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)