
// import beberapa fungsi dari Firebase 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

// baru
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeH1_XgVENZ2GPEr9shpeIZKUMfIny6XQ",
    authDomain: "example-marketplace-c0115.firebaseapp.com",
    projectId: "example-marketplace-c0115",
    storageBucket: "example-marketplace-c0115.appspot.com",
    messagingSenderId: "60494730630",
    appId: "1:60494730630:web:9582f2cb0a4dd175cac807",
    measurementId: "G-FQCVJ54KCD"
};

const app = initializeApp(firebaseConfig);

// baru
export const auth = getAuth(app)

// Firebase storage reference
const storage = getStorage(app);
export default storage;