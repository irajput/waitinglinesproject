// client/src/App.js
import React from "react";
import "./App.css";
import Home from "../Home/Home";
import Slider from "../Slider/Slider";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Display from "../Display/Display";
import Stopwatch from "../Stopwatch/Stopwatch"
import Predictions from "../Predictions/Predictions"
import { Routes, Route, Link} from "react-router-dom";
import useToken from "./useToken"
import Emailer from "../Emailer/Emailer"

function App() {
  //if (sessionStorage.getItem('token') != null) {
  return (
    <div className ="App"> 
    <Emailer />
    <nav>
        <ul id="navbar">
          <li>
            <Link to="/"> Home </Link>
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
        </ul>
      </nav>
    
    <div className = "main" >

    <Routes>
      <Route exact path="/" element={<Home/>} />

      <Route path="/login" element={<Login/>} />

      <Route path="/profile" element={<Profile/>} />

      <Route path="/display" element={<Display/>} />

      <Route path="/stopwatch" element={<Stopwatch/>} />

      <Route path="/predictions" element={<Predictions/>} />

    </Routes>

    </div>
   
    
    </div>
  );
}
/*else {
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

      <Route path="/profile" element={<Profile/>} />

      <Route path="/display" element={<Display/>} />

    </Routes>

    </div>
   
    
    </div>
  );
}*/

export default App;
