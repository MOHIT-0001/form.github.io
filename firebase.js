
const firebaseConfig = {
  apiKey: "AIzaSyCfkSQzxdorBzBACW2cy3sfj67N3aA9UlQ",
  authDomain: "tablet-firebase.firebaseapp.com",
  projectId: "tablet-firebase",
  storageBucket: "tablet-firebase.appspot.com",
  messagingSenderId: "152696543265",
  appId: "1:152696543265:web:5d55e7cc18d005df6a2b60"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
  console.log(db);