// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyBiuSf3oKJCfM1EdvtW5tWxKvWHQsEs0FQ",
//   authDomain: "findlostitem-1ef05.firebaseapp.com",
//   projectId: "findlostitem-1ef05",
//   storageBucket: "findlostitem-1ef05.firebasestorage.app",
//   messagingSenderId: "513263973419",
//   appId: "1:513263973419:web:41823ae41f0cd9cbe0666e"
apiKey: import.meta.env.VITE_apiKey,
authDomain: import.meta.env.VITE_authDomain,
projectId: import.meta.env.VITE_projectId,
storageBucket: import.meta.env.VITE_storageBucket,
messagingSenderId: import.meta.env.VITE_messagingSenderId,
appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth