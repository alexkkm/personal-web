import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhcs7seSxsRF1pEeZ8MP4wCbhAD8f-EVg",
    authDomain: "personal-alexkkm.firebaseapp.com",
    databaseURL: "https://personal-alexkkm-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "personal-alexkkm",
    storageBucket: "personal-alexkkm.appspot.com",
    messagingSenderId: "114573113653",
    appId: "1:114573113653:web:11c38d24126106a2ad347c",
    measurementId: "G-BKST8M54FH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app)

export default auth;