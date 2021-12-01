import './Profile.css';
import Switch from './Switch';
import getToken from '../App/App'
import React, { Component } from 'react';


async function profile() {
  return fetch('http://localhost:3001/user/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'secret_token': sessionStorage.getItem('token')
      'secret_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTAyZDEyOTRiMjY0YTg5YzNlZmRmMiJ9LCJpYXQiOjE2Mzc4OTAyMjN9.eP0hFksBRU8Gdz-Xe9QAzICB5a1D4oSp5kEtPBftXmQ"
    }
  })
    .then(data => data.json())
 }

 const logProfile = async e => {
  e.preventDefault();
  console.log("logging profile")
  console.log(sessionStorage.getItem('token'))
  const data = await profile()
  console.log("got it")
  console.log(data)
  }

 class Profile extends Component {
  constructor(props) {
      super(props);

      this.postProfileChanges = this.postProfile.bind(this);
      this.getProfile = this.updateProfilePage.bind(this);
  }

  updateProfilePage() {
    console.log("updating profile page")
    //TODO: Find how to get profile preferences
    var maxWaitInput = document.getElementById("wait-min");
    maxWaitInput.value = "40";
    for (var i = 0; i < 7; i++) {
      var checkboxInput = document.getElementById(i.toString());
      if (i === 3 || i === 4)
      {
        checkboxInput.checked = false;
      }
    }
  }

  postProfile() {
    console.log("posting profile changes");
    var maxWaitInput = document.getElementById("wait-min");
    var maxWait = maxWaitInput.value;
    var restaurantPrefs = [];
    for (var i = 0; i < 7; i++) {
      var checkboxInput = document.getElementById(i.toString());
      restaurantPrefs.push(checkboxInput.checked)
    }
    console.log(maxWait)
    console.log(restaurantPrefs)
    //TODO: Find how to update profile preferences
  }

  render() {
    return (
      <div className="profile container">
        <input type="button" value="Log profile" onClick={logProfile}/>
        <input  type="button" value="Get Profile" onClick={this.updateProfilePage}/>
        <h1>Profile Page</h1>
        <h3>Receive notifications</h3>
        <p>Notifications will be sent to the email tied to your account. </p>
        
        <div id="container">
            <h3>Maximum wait time (minutes):</h3>
            <p>Once the wait time at a restaurant drops below this threshold, you will be notified. </p>
            <input type="number" id="wait-min" name="wait-min" min="1" max="60" defaultValue="30"/>
            <h3>Receive notifications for these restaurants:</h3>
            <div class="checks">
            <div id="outer">
                <input type="checkBox"  className = "inner" id = "0" defaultChecked/>
                <p className = "inner"> Bruin Cafe </p>
            </div>
            <div id="outer">
              <input type="checkBox"  className = "inner" id = "1" defaultChecked/>
              <p className = "inner"> Bruin Plate </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "2" defaultChecked/>
                <p className = "inner"> De Neve </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "3" defaultChecked/>
                <p className = "inner"> Epicuria </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "4" defaultChecked/>
                <p className = "inner"> Feast </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "5" defaultChecked/>
                <p className = "inner"> Rendezvous </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "6" defaultChecked/>
                <p className = "inner"> The Study </p>
            </div>
            </div>
            <input type="button" class="profileButton" value="Submit Changes" onClick={this.postProfile}/>

          </div>


      </div>
    );
  }
}

export default Profile;
