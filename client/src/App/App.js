// client/src/App.js
import React from "react";
import "./App.css";
import Home from "../Home/Home";
import Slider from "../Slider/SliderApp";
import Login from "../Login/Login";
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
    <div className ="WaitApp"> 
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
        </ul>
      </nav>
    
    <div className = "main" >

    <Routes>
      <Route exact path="/" element={<Home/>} />

      <Route path="/login" element={<Login/>} />

      <Route path="/slider" element={<Slider/>} />

    </Routes>

    </div>
   
    
    </div>



  );
}

export default App;
