import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import UserLandingPage from "../Pages/UserLandingPage";
import RecipePage from "../Pages/RecipePage";

interface Props {
  userData: any;
  setUser: (user: any) => void
}
export const Routers: React.FC<Props> = ({ userData, setUser }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <UserLandingPage userData={userData} setUser={setUser}/> }/>
        <Route path="/about" element={ <AboutPage/> }/>
        <Route path="/recipePage" element={ <RecipePage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
