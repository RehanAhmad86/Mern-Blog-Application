// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "rehan-blog.firebaseapp.com",
  projectId: "rehan-blog",
  storageBucket: "rehan-blog.appspot.com",
  messagingSenderId: "1049259369434",
  appId: "1:1049259369434:web:f8272d240d2b5c4c6216e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);