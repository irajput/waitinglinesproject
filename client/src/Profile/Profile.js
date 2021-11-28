import './Profile.css';
import Checkbox from './Checkbox';
import Switch from './Switch';
// import getToken from '../App/App'
import React, { Component } from 'react';


async function profile() {
  return fetch('http://localhost:3001/user/profile', {
    mode: 'no-cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'secret_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTEyNWM0YTVmZDJkNjM0NGQwNGE5OCJ9LCJpYXQiOjE2Mzc5ODg2NTR9.c2S3ITwUkUZ0P8_OL6a0Nc1GMUx6XQ2l2M-Fe9QFbW4"
    }
  })
    .then(data => data.json())
 }

 function logProfile() {
   console.log("logging profile")
   var data = profile()
   console.log(data)
 }

 class Profile extends Component {
  // constructor(props) {
  //     super(props);
  
  //     // this.state = {
  //     //   
  //     // } 
  // }

  render() {
    return (
      <div className="profile">
        <input type="button" value="Log profile" onClick={logProfile}/>
        <h1>Profile Page</h1>
        <h3>Receive notifications</h3>
        <Switch />
        <div id="container">
          <button id = "dummy-button" className="dummy-button"/>
          <div id = "notification-opts" disabled>
            <h3>Maximum wait time before notification:</h3>
            <input type="number" id="wait-min" name="wait-min" min="1" max="60" />
            <h3>Receive notifications for these halls:</h3>
            <div id="outer">
                <Checkbox className = "inner"/>
                <p className = "inner"> Hall 1 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner"/>
                <p className = "inner"> Hall 2 </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner"/>
                <p className = "inner"> Hall 3 </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
