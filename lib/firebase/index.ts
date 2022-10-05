import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig: string = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '')

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const database = firebase.firestore()

export { database };
export default firebase;
