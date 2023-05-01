import React from "react";
import 'firebase/compat/auth';
import { auth } from "../App";
import { useDispatch } from "react-redux";


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
