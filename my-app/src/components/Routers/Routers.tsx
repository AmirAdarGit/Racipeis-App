import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import UserLandingPage from "../Pages/UserLandingPage";

interface Props {
  userData: any;
}
export const Routers: React.FC<Props> = ({ userData }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <UserLandingPage userData={userData}/> }/>
        <Route path="/about" element={ <AboutPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
