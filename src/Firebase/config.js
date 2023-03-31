import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQpVuAKjPh6-oQTe3p3gYBmjbNyTuqni8",
  authDomain: "order-acknowledgement.firebaseapp.com",
  projectId: "order-acknowledgement",
  storageBucket: "order-acknowledgement.appspot.com",
  messagingSenderId: "126905739768",
  appId: "1:126905739768:web:a9a63c2ec4944b3205ce0d",
  measurementId: "G-DHFQH0EWV6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
