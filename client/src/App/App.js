// client/src/App.js

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard.js';
import Preferences from '../Preferences.js';
import Login from '../Login/Login';
import "./App.css";
import useToken from './useToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const { token, setToken } = useToken();

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
