import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB9loxe-wd1lL0t4Z7n0DEhyloxvfuz9ts",
    authDomain: "destino-plus.firebaseapp.com",
    projectId: "destino-plus",
    storageBucket: "destino-plus.firebasestorage.app",
    messagingSenderId: "872580339820",
    appId: "1:872580339820:web:d440a7b02810027f582049",
    measurementId: "G-TT6MX1S9SE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;