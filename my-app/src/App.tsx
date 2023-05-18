import React, { useEffect, useState } from 'react';
import './App.css';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { SignInComponent } from "./components/SignIn";
import Routes from "./components/Routers/Routers";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { getAllTheRecipesOfTheUser } from "./functions/recipesDB.Queries";
import { useDispatch, useSelector } from "react-redux";
import { getIsFetchRecipes, getRecipesCards } from "./redux/selectors/recipesCards.selector";


function App() {

  const [user, setUser] = useState<User | null>(
    // JSON.parse(localStorage.getItem('user') || 'null')
  );

  useEffect(() => {

  })

  const dispatch = useDispatch();
  const isFetchedRecipes = useSelector(getIsFetchRecipes);
  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("--------------------")
        console.log(user)
        console.log("--------------------")

        // User is signed in, store the user data in local storage
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
          if (!isFetchedRecipes) {
            getAllTheRecipesOfTheUser(user.uid).then((recipesFromDB) => {
              dispatch({ type: 'SET_ALL_THE_RECIPES_FROM_DB', payload:  recipesFromDB});
            })
          }
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
