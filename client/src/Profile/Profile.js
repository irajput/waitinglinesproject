import './Profile.css';
import Switch from './Switch';
import React, { Component } from 'react';

const RESTAURANTCODES = ["BPlate", "Rendezvous","Study","Feast","BCafe","DeNeve","Epic"];
// Restaurant IDs to Restaurant codes
const IDTORESTAURANT = {"61a2931328ac130c1a866f8e":"BPlate","61a6ce86d5dd6cd7b66447e6":"Rendezvous","61a6ce8bd5dd6cd7b66447e8":"Study","61a6ce8fd5dd6cd7b66447ea":"Feast","61a6ce95d5dd6cd7b66447ec":"BCafe","61a6ce9bd5dd6cd7b66447ee":"DeNeve","61a6cea0d5dd6cd7b66447f0":"Epic"}

async function profile() {
  return fetch('http://localhost:3001/user/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'secret_token': sessionStorage.getItem('token')
    }
  })
    .then(data => data.json())
 }

 async function addToRestaurant(restaurant) {
  return fetch('http://localhost:3001/user/addToRestaurantNotifs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'secret_token': sessionStorage.getItem('token')
    },
    body : JSON.stringify({
      'restaurantName': restaurant,
    })
  })
 }

 const logProfile = async e => {
  e.preventDefault();
  const data = await profile()
  console.log(data)
  }

 class Profile extends Component {
  constructor(props) {
      super(props);

      this.Switch = React.createRef();

      this.postProfileChanges = this.postProfile.bind(this);
      this.getProfile = this.updateProfilePage.bind(this);
  }

  componentDidMount = () => {
    this.updateProfilePage()
  }

  componentWillUnmount = () => {
    
  }

  async updateProfilePage() {
    console.log("updating profile page")
    const data = await profile();
    var followingRestaurants = data.user.followingRestaurants; //IDs
    var uncheckedRestaurants = [...RESTAURANTCODES];
    //Check those in following restaurants
    for (var i = 0; i < followingRestaurants.length; i++) {
      var restaurantID = followingRestaurants[i]
      var restaurantName = IDTORESTAURANT[restaurantID];
      //Remove checked restaurant from uncheckedRestaurants
      const index = uncheckedRestaurants.indexOf(restaurantName);
      if (index > -1) {
        uncheckedRestaurants.splice(index, 1);
      }
      var checkboxInput = document.getElementById(restaurantName);
      checkboxInput.checked = true;
    }
    //Uncheck those values not in following restaurants
    for (i = 0; i < uncheckedRestaurants.length; i++) {
      var restaurantName = uncheckedRestaurants[i]
      var checkboxInput = document.getElementById(restaurantName);
      checkboxInput.checked = false;
    }
    // var maxWaitInput = document.getElementById("wait-min");
    // maxWaitInput.value = "40";
  }

  async postProfile() {
    console.log("posting profile changes");
    var restaurantPrefs = [];
    for (var i = 0; i < 7; i++) {
      var checkboxInput = document.getElementById(RESTAURANTCODES[i]);
      restaurantPrefs.push(checkboxInput.checked)
    }
    for (var j = 0; j < 7; j++) {
      if (restaurantPrefs[j]) {
        var test = await addToRestaurant(RESTAURANTCODES[j])
      }
    }
  }

  render() {
    return (
      <div className="profile">
        <input type="button" value="Log profile" onClick={logProfile}/>
        <input type="button" value="Update Page" onClick={this.updateProfilePage}/>
        <h1>Profile Page</h1>
        <input type="button" value="Submit Changes" onClick={this.postProfile}/>
        <h3>Receive notifications</h3>
        <p>Notifications will be sent to the email tied to your account. </p>
        <Switch ref={this.Switch}/>
        <div id="container">
          <button id = "dummy-button" className="dummy-button"/>
          <div id = "notification-opts" disabled>
            <h3>Maximum wait time (minutes):</h3>
            <p>Once the wait time at a restaurant drops below this threshold, you will be notified. </p>
            <input type="number" id="wait-min" name="wait-min" min="1" max="60" defaultValue="30"/>
            <h3>Receive notifications for these restaurants:</h3>
            <div id="outer">
                <input type="checkBox"  className = "inner" id = "BCafe"/>
                <p className = "inner"> Bruin Cafe </p>
            </div>
            <div id="outer">
              <input type="checkBox"  className = "inner" id = "BPlate"/>
              <p className = "inner"> Bruin Plate </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "DeNeve"/>
                <p className = "inner"> De Neve </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "Epic"/>
                <p className = "inner"> Epicuria </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "Feast"/>
                <p className = "inner"> Feast </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "Rendezvous"/>
                <p className = "inner"> Rendezvous </p>
            </div>
            <div id="outer">
            <input type="checkBox"  className = "inner" id = "Study"/>
                <p className = "inner"> The Study </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
