import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC7DBQzBvU-ZPnE8VqRwAJp8C9vFQKaQhI",
  authDomain: "cooking-recipes-9bea3.firebaseapp.com",
  projectId: "cooking-recipes-9bea3",
  storageBucket: "cooking-recipes-9bea3.appspot.com",
  messagingSenderId: "105044177228",
  appId: "1:105044177228:web:413199bdefaa9ee69f5fe9",
  measurementId: "G-9YVWGNH480"
})


export const storage = getStorage(firebaseApp)
export const auth: any = firebase.auth()
// export const firestore = firebase.firestore()