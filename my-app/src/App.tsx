import React, { useEffect, useState } from 'react';
import './App.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { SignInComponent } from "./components/SignIn";
import Routes from "./components/Routers/Routers";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { useDispatch } from "react-redux";

function App() {

  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();
  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, store the user data in local storage
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        // User is signed out,  the user data from local storage
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' }); // clean the user redux state.
        dispatch({ type: 'REMOVE_RECIPES_FROM_STATE' }); // clean the recipes redux state.
        setUser(null);
      }
    });

    // Unsubscribe to the listener when unmounting the component
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className="App">
      {user ? <Routes userData={user} setUser={setUser}/> : <SignInComponent/>}
    </div>
  );
}

export default App;
