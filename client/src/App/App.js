// client/src/App.js
import React from "react";
import "./App.css";
import Home from "../Home/Home";
import Slider from "../Slider/Slider";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Profile from "../Profile/Profile";
import Display from "../Display/Display";
import Stopwatch from "../Stopwatch/Stopwatch"
import Predictions from "../Predictions/Predictions"
import { Routes, Route, Link} from "react-router-dom";
import { session } from "passport";

function App() {
  sessionStorage.setItem('login', 'false');
  let mtoken = sessionStorage.getItem('token');
  if (mtoken !== null) {
  return (
    <div className ="App"> 
    <nav>
        <ul id="navbar">
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/signup"> Sign Up </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
          <li>
            <Link to="/profile"> Profile </Link>
          </li>
          <li>
            <Link to="/display"> Wait Line Display </Link>
          </li>
          <li>
            <Link to="/stopwatch"> Clock In/Out </Link>
          </li>
          <li>
            <Link to="/predictions"> Predictions </Link>
          </li>
          <li>
            <Link to="/slider"> Crowdedness </Link>
          </li>
        </ul>
      </nav>
    
    <div className = "main" >

    <Routes>
      <Route exact path="/" element={<Home/>} />

      <Route path="/login" element={<Login/>} />

      <Route path="/signup" element={<Signup/>} />

      <Route path="/profile" element={<Profile/>} />

      <Route path="/display" element={<Display/>} />

      <Route path="/stopwatch" element={<Stopwatch/>} />

      <Route path="/slider" element={<Slider/>} />

      <Route path="/predictions" element={<Predictions/>} />

    </Routes>

    </div>
   
    
    </div>
  );
}
else {
  return (
    <div className ="App"> 
    <nav>
        <ul id="navbar">
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/signup"> Sign Up </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
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

      <Route path="/signup" element={<Signup/>} />

      <Route path="/profile" element={<Profile/>} />

      <Route path="/display" element={<Display/>} />

    </Routes>

    </div>
   
    
    </div>
  );
}
}

export default App;
