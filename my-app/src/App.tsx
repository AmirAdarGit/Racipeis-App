import React, { useEffect, useState } from 'react';
import './App.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Routes from "./components/Routers/Routers";

function App() {

  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
