// Import the functions you need from the SDKs you need


// import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjlVcgxEQMHh1MMPdNV-f3Bg-q1l_vFY",
  authDomain: "table-firebase.firebaseapp.com",
  projectId: "table-firebase",
  storageBucket: "table-firebase.appspot.com",
  messagingSenderId: "128336543735",
  appId: "1:128336543735:web:d37f2fafaff3d3246438f2"
};

firebase.initializeApp(firebaseConfig);


// Initialize Firebase

// const app = initializeApp(firebaseConfig);

export const db = firebase.firestore();
  console.log(db);
