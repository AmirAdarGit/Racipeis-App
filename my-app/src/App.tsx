import React, { useEffect, useState } from 'react';
import './App.css';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { SignInComponent } from "./components/SignIn";
import Routes from "./components/Routers/Routers";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { getAllTheRecipesOfTheUser } from "./functions/recipesDB.Queries";


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
        getAllTheRecipesOfTheUser(user.uid).then(() => setUser(user))
      } else {
        // User is signed out, remove the user data from local storage
        localStorage.removeItem('user');
        setUser(null);
      }
    });

    // Unsubscribe to the listener when unmounting the component
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? <Routes userData={user}/> : <SignInComponent/>}
    </div>
  );
}

export default App;
