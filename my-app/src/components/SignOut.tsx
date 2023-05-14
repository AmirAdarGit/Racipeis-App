import React from "react";
import 'firebase/compat/auth';
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";


interface Props {
  setUser: (user: any) => void
}

export const SignOutComponent: React.FC<Props> = ({setUser}) => {
  const dispatch = useDispatch();

  const signOutWithGoogle = () => {
    auth.signOut()
    dispatch({ type: 'LOGOUT' }); // clean the user redux state.
    dispatch({ type: 'REMOVE_RECIPES_FROM_STATE' }); // clean the recipes redux state.
    setUser('') // clear the google user start so the SignInComponent component will render.
    localStorage.removeItem('user'); // clear the local storage.
  }

  return (
    <div>
      <button onClick={signOutWithGoogle}>Sign out</button>
    </div>
  )
}

export default SignOutComponent;
