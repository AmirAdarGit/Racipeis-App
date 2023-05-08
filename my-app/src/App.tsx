import React, { useEffect, useState } from 'react';
import './App.css';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { UserLandingPage } from "./components/UserLangingPage";
import { SignInComponent } from "./components/SignIn";
import Routes from "./components/Routers/Routers";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyC7DBQzBvU-ZPnE8VqRwAJp8C9vFQKaQhI",
  authDomain: "cooking-recipes-9bea3.firebaseapp.com",
  projectId: "cooking-recipes-9bea3",
  storageBucket: "cooking-recipes-9bea3.appspot.com",
  messagingSenderId: "105044177228",
  appId: "1:105044177228:web:413199bdefaa9ee69f5fe9",
  measurementId: "G-9YVWGNH480"
})

export const auth: any = firebase.auth()
export const firestore = firebase.firestore()



function App() {

  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, store the user data in local storage
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        // User is signed out, remove the user data from local storage
        localStorage.removeItem('user');
        setUser(null);
      }
    });

    // Unsubscribe to the listener when unmounting the component
    return () => unsubscribe();
  }, []);



  console.log("user", user)
  return (
    <div className="App">
      {user ? <UserLandingPage userData={user}/> : <SignInComponent />}
      {/*{user ? <Routes/> : <SignInComponent/>}*/}
    </div>
  );
}

export default App;
