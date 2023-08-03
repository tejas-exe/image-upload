import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvmT4-lvgOoxoLqGnQz8rKPrzO7GyRy50",
  authDomain: "image-gallery-47920.firebaseapp.com",
  projectId: "image-gallery-47920",
  storageBucket: "image-gallery-47920.appspot.com",
  messagingSenderId: "356456729131",
  appId: "1:356456729131:web:467184352d14813e98786e",
  measurementId: "G-S5SH1GEMCH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
