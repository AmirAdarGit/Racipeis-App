import React from "react";
import 'firebase/compat/auth';
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";


export const SignOutComponent: React.FC = () => {
  const dispatch = useDispatch();

  const signOutWithGoogle = () => {
    auth.signOut()
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <div>
      <button onClick={signOutWithGoogle}>Sign out</button>
    </div>
  )
}

export default SignOutComponent;
