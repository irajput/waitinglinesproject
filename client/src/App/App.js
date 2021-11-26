// client/src/App.js
import React from "react";
import "./App.css";
import Home from "../Home/Home";
import Slider from "../Slider/Slider";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Display from "../Display/Display";
import { Routes, Route, Link} from "react-router-dom";

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}


function App() {  
  return (
    <div className ="App"> 
    <nav>
        <ul id="navbar">
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
          <li>
            <Link to="/slider"> Slider </Link>
          </li>
          <li>
            <Link to="/profile"> Profile </Link>
          </li>
          <li>
            <Link to="/display"> Wait Line Display </Link>
          </li>
        </ul>
      </nav>
    
    <div className = "main" >

    <Routes>
      <Route exact path="/" element={<Home/>} />

      <Route path="/login" element={<Login/>} />

      <Route path="/slider" element={<Slider/>} />

      <Route path="/profile" element={<Profile/>} />

      <Route path="/display" element={<Display/>} />

    </Routes>

    </div>
   
    
    </div>



  );
}

export default App;
