import React from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { auth } from "../App";
import { useAuthState } from "react-firebase-hooks/auth";


export const SignInComponent: React.FC = () => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  // const [user] = useAuthState(auth)

  console.log("amir")
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default SignInComponent;
