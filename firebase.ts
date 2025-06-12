// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLOgHom2lzbY08Hv03ZssgfIwxS4tu0zY",
    authDomain: "netflix-clone-f4e43.firebaseapp.com",
    projectId: "netflix-clone-f4e43",
    storageBucket: "netflix-clone-f4e43.firebasestorage.app",
    messagingSenderId: "301476799783",
    appId: "1:301476799783:web:20e95485b0e6914b69f502"
  };
  
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }