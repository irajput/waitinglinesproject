import './Profile.css';
import Checkbox from './Checkbox';
import Switch from './Switch';
import getToken from '../App/App'
import React, { Component } from 'react';


async function profile() {
  // 'http://localhost:3001/user/profile'
  return fetch('http://localhost:3001/user/profile', {
    // mode: 'no-cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'secret_token': getToken()
      'secret_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTAyZDEyOTRiMjY0YTg5YzNlZmRmMiJ9LCJpYXQiOjE2Mzc4OTAyMjN9.eP0hFksBRU8Gdz-Xe9QAzICB5a1D4oSp5kEtPBftXmQ"
    }
  })
  .then(data => {console.log(data)});
    // .then(data => data.json())
 }

//  async function profile() {
//   let response = await fetch('http://localhost:3001/login', 
//   {mode: 'no-cors', method: 'POST',});

//   console.log(response); 
// }

// const axios = require('axios');

// async function profile() {

//   const config = {
//     method: 'get',
//     mode: 'no-cors',
//     url: 'http://localhost:3001/user/testJWT'
// }

// // const config = {
// //   method: 'get',
// //   url: 'http://webcode.me'
// // }

//   let res = await axios(config);
//   console.log(res);
//   // let data = res.data;
//   // console.log(data);
// }

 const logProfile = async e => {
  e.preventDefault();
  console.log("logging profile")
  const data = await profile()
  console.log("got it")
  console.log(data)
  }

 class Profile extends Component {
  constructor(props) {
      super(props);

      this.postProfileChanges = this.postProfileChanges.bind(this);
  
      // this.state = {
      //   
      // } 
  }

  postProfileChanges() {
    console.log("posting profile changes");
    var maxWaitInput = document.getElementById("wait-min");
    var maxWait = maxWaitInput.value;
    
  }

  render() {
    return (
      <div className="profile">
        <input type="button" value="Log profile" onClick={logProfile}/>
        <h1>Profile Page</h1>
        <input type="button" value="Submit Changes" onClick={this.postProfileChanges}/>
        <h3>Receive notifications</h3>
        <Switch />
        <div id="container">
          <button id = "dummy-button" className="dummy-button"/>
          <div id = "notification-opts" disabled>
            <h3>Maximum wait time before notification:</h3>
            <input type="number" id="wait-min" name="wait-min" min="1" max="60" />
            <h3>Receive notifications for these halls:</h3>
            <div id="outer">
                <Checkbox className = "inner" id = "0"/>
                <p className = "inner"> Hall 0 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "1"/>
                <p className = "inner"> Hall 1 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "2"/>
                <p className = "inner"> Hall 2 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "3"/>
                <p className = "inner"> Hall 3 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "4"/>
                <p className = "inner"> Hall 4 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "5"/>
                <p className = "inner"> Hall 5 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "6"/>
                <p className = "inner"> Hall 6 </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
