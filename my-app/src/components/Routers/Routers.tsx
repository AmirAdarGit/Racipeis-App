import React from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import AboutPage from "../Pages/AboutPage";
import RecipesCatalog from "../Pages/RecipesCatalogPage";
import RecipePage from "../Pages/RecipePage";
import SignInComponent from "../Authentication/SignIn";
import SideBar from "../Side-bar/SideBarComponent";
import MyLinkedPage from "../Pages/MyLinkdPage";

interface Props {
}

const RoutesComponent: React.FC<Props> = () => {

  return (
      <BrowserRouter>
        <SideBar></SideBar>

        <Routes>
          <Route path="/" element={ <SignInComponent/> }/>
          <Route path="/about" element={ <AboutPage/> }/>
          <Route path="/recipePage" element={ <RecipePage/> }/>
          <Route path="/myLinks" element={ <MyLinkedPage/> }/>
          <Route path="/myRecipesCatalog" element={ <RecipesCatalog/> }/>
          <Route path="/*" element={ <Navigate to="/"/> }/> {/* Redirect all other paths to the landing page */ }
        </Routes>
      </BrowserRouter>
  );
}

export default RoutesComponent;
