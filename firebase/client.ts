import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollection } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiTu_NMGHt8I3DV5MAU7Q0APBg-iVM16U",
  authDomain: "superlista-v2.firebaseapp.com",
  projectId: "superlista-v2",
  storageBucket: "superlista-v2.appspot.com",
  messagingSenderId: "491637516760",
  appId: "1:491637516760:web:49a0746766bbe302ceaaad",
  measurementId: "G-S0L80T326D"
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const fetchAllProducts = () => {
  return db
    .collection("products")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id

        return {
          ...data,
          id,
        }
      })
    })
}
