import React from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { auth } from "../App";


export const SignInComponent: React.FC = () => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default SignInComponent;
