import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";


export const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/about" element={ <AboutPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
