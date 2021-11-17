// client/src/App.js

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard.js';
import Preferences from './Preferences.js';
import Login from './Login.js';
import "./App.css";

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/preferences" element={<Preferences/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
