import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDo2SIhQWrDfp3iMgylj_17mHUl6kwNHIQ",
  authDomain: "bookmark-manager-f575a.firebaseapp.com",
  projectId: "bookmark-manager-f575a",
  storageBucket: "bookmark-manager-f575a.appspot.com",
  messagingSenderId: "1017828958451",
  appId: "1:1017828958451:web:5fe27b3f50b7df74371786",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
