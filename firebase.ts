import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2JWznb1yF0t6Yau2Qc0OFyWaAqUoLs8g",
  authDomain: "drtrend-3b1f8.firebaseapp.com",
  projectId: "drtrend-3b1f8",
  storageBucket: "drtrend-3b1f8.firebasestorage.app",
  messagingSenderId: "374022414883",
  appId: "1:374022414883:web:324df7fa104a48b642c796",
  measurementId: "G-CD2WMW457T"
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);