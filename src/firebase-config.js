// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxJWyFWXTfpZqqbwl96V4xF5C99ixj2_k",
  authDomain: "evanisthree-f9e63.firebaseapp.com",
  projectId: "evanisthree-f9e63",
  storageBucket: "evanisthree-f9e63.appspot.com",
  messagingSenderId: "824555536122",
  appId: "1:824555536122:web:af6219b7e2ff4626fd5343",
  measurementId: "G-PLQSTKS3PR"
};

const app = initializeApp(firebaseConfig);
export const txtdb = getFirestore(app);
export const imgdb = getStorage(app);
export const auth = getAuth(app);

// src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyC1qBV6C_nsgtkPv5fXoeYhuimjaIpEEws",
//   authDomain: "mediapilot-1.firebaseapp.com",
//   projectId: "mediapilot-1",
//   storageBucket: "mediapilot-1.firebasestorage.app",
//   messagingSenderId: "463145255246",
//   appId: "1:463145255246:web:f9f0c30abbe3f985b29e1f",
//   measurementId: "G-X92KYB4C6Q"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const txtdb = getFirestore(app);
// export const imgdb = getStorage(app);
// export const auth = getAuth(app);