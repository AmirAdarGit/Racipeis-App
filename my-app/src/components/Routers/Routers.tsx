import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import RecipesCatalog from "../Pages/RecipesCatalogPage";
import RecipePage from "../Pages/RecipePage";
import SignInComponent from "../SignIn";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { useDispatch } from "react-redux";
import SideBar from "../Side-bar/SideBarComponent";
import MyLinkedPage from "../Pages/MyLinkdPage";

interface Props {
}

const RoutesComponent: React.FC<Props> = () => {
  const [user, setUser] = useState<User | null>(null);
  const parsUserLocalStorageData = JSON.parse(localStorage.getItem('user') || '{}')
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        dispatch({type: 'REMOVE_RECIPES_FROM_STATE'});
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    }
  }, [dispatch]);

  // if user sighOut of new user see the app
  if (Object.keys(parsUserLocalStorageData).length === 0) {
    return <SignInComponent/>;
  }

  return (
    <>
      <BrowserRouter>
        <SideBar></SideBar>

        <Routes>
          <Route path="/" element={ <RecipesCatalog userData={ user } setUser={ setUser }/> }/>
          <Route path="/about" element={ <AboutPage/> }/>
          <Route path="/recipePage" element={ <RecipePage/> }/>
          <Route path="/myLinks" element={ <MyLinkedPage/> }/>
          <Route path="/*" element={ <Navigate to="/"/> }/> {/* Redirect all other paths to the landing page */ }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RoutesComponent;
