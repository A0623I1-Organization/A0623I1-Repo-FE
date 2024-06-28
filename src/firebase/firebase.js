// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage,ref,getDownloadURL  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7STqVTK7td7fWtckcljcQ5sK8z40d4gQ",
    authDomain: "imageuploaddb-4f4f5.firebaseapp.com",
    databaseURL: "https://imageuploaddb-4f4f5-default-rtdb.firebaseio.com",
    projectId: "imageuploaddb-4f4f5",
    storageBucket: "imageuploaddb-4f4f5.appspot.com",
    messagingSenderId: "471281579480",
    appId: "1:471281579480:web:4fa4db107b8dd59d4eeead",
    measurementId: "G-XH7MQWT1PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);
export { app, analytics, database ,storage,ref,getDownloadURL };