import './Profile.css';
import Checkbox from './Checkbox';
import Switch from './Switch';
import getToken from '../App/App'
import React, { Component } from 'react';


async function profile() {
  return fetch('http://localhost:3001/user/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'secret_token': getToken()
      'secret_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTAyZDEyOTRiMjY0YTg5YzNlZmRmMiJ9LCJpYXQiOjE2Mzc4OTAyMjN9.eP0hFksBRU8Gdz-Xe9QAzICB5a1D4oSp5kEtPBftXmQ"
    }
  })
  // .then(data => {console.log(data)});
    .then(data => data.json())
 }

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
        <p>Notifications will be sent to the email tied to your account. </p>
        <Switch />
        <div id="container">
          <button id = "dummy-button" className="dummy-button"/>
          <div id = "notification-opts" disabled>
            <h3>Maximum wait time (minutes):</h3>
            <p>Once the wait time at a restaurant drops below this threshold, you will be notified. </p>
            <input type="number" id="wait-min" name="wait-min" min="1" max="60" defaultValue="30"/>
            <h3>Receive notifications for these restaurants:</h3>
            <div id="outer">
                <Checkbox className = "inner" id = "0"/>
                <p className = "inner"> Bruin Cafe </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "1"/>
                <p className = "inner"> Bruin Plate </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "2"/>
                <p className = "inner"> De Neve </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "3"/>
                <p className = "inner"> Epicuria </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "4"/>
                <p className = "inner"> Feast </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "5"/>
                <p className = "inner"> Rendezvous </p>
            </div>
            <div id="outer">
                <Checkbox className = "inner" id = "6"/>
                <p className = "inner"> The Study </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
