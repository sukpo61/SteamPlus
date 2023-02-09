// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAP6q65SrEjAxSQ4YRZuYhN-j8MT6bE1p0",
  authDomain: "steamplus-a629d.firebaseapp.com",
  projectId: "steamplus-a629d",
  storageBucket: "steamplus-a629d.appspot.com",
  messagingSenderId: "303570818411",
  appId: "1:303570818411:web:31f08066343b189f4b682e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const apiKeys = firebaseConfig.apiKey;
// export const db = getFirestore(app);
export const authService = getAuth(app);
// export const storage = getStorage(app);

export default app;
