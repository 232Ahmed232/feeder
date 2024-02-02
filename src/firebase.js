// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbeA3bMg_0ju8gW6lh0DJFsjtAiWm14xM",
  authDomain: "feeder-72086.firebaseapp.com",
  projectId: "feeder-72086",
  storageBucket: "feeder-72086.appspot.com",
  messagingSenderId: "1176515242",
  appId: "1:1176515242:web:330d21199aecaea32d96d3",
  measurementId: "G-9CGWX92YWD",
  databaseURL :"https://feeder-72086-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);