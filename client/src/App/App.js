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
import History from "../History/History"
import { Routes, Route, Link} from "react-router-dom";
import { session } from "passport";
import Emailer from "../Emailer/Emailer"

function App() {
  //if (sessionStorage.getItem('token') != null) {
   // <nav class="nav nav-pills nav-fill navMINE">
   sessionStorage.setItem('login', 'false');
   let mtoken = sessionStorage.getItem('token');
   if (mtoken !== null) {
   return (
    <div className ="App"> 
    <Emailer />


    <div class="nav">
      <ul>
        <li class="home"><a class="nav-item nav-link active" href="/">Home</a></li>
        <li class="tutorials"><a class="nav-item nav-link " href="/login">Login</a></li>
        <li class="news"><a class="nav-item nav-link " href="/signup">Sign Up</a></li>

        <li class="about"><a class="nav-item nav-link " href="/profile">Profile</a></li>
        <li class="news"><a class="nav-item nav-link " href="/display">Wait Line Display</a></li>
        <li class="contact"><a class="nav-item nav-link " href="/stopwatch">Clock In/Out </a></li>
        <li class="contact"><a class="nav-item nav-link " href="/predictions">Predictions </a></li>
        <li class="contact"> <a class="nav-item nav-link " href="/slider">Crowdedness </a></li>

      </ul>
       
    </div>
        
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

      <Route path="/history" element={<History/>} />

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
          <li>
            <Link to="/predictions"> Predictions </Link>
          </li>
          <li>
            <Link to="/history"> History </Link>
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

      <Route path="/predictions" element={<Predictions/>} />

      <Route path="/history" element={<History/>} />

    </Routes>

    </div>
   
    
    </div>
  );
}
}

export default App;
