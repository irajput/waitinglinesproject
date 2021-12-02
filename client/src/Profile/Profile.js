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
    // TODO: make switch mean something
    // If switch is off, don't post anything
    // const currentSwitch = this.Switch.current;
    // if (currentSwitch.state.on) {
    var restaurantPrefs = [];
    for (var i = 0; i < 7; i++) {
      var checkboxInput = document.getElementById(RESTAURANTCODES[i]);
      restaurantPrefs.push(checkboxInput.checked)
    }
    //TODO: Find how to update profile preferences
    for (var j = 0; j < 7; j++) {
      if (restaurantPrefs[j]) {
        var test = await addToRestaurant(RESTAURANTCODES[j])
      }
    }
    // }
  }

  render() {
    return (
      <div className="profile container">
        
        <h1>Profile Page</h1>
        <h4>Receive notifications</h4>
        <p>Notifications will be sent to the email tied to your account. </p>
        
        <div id="container">
            <h4>Maximum wait time (minutes):</h4>
            <p>Once the wait time at a restaurant drops below this threshold, you will be notified. </p>
            <input type="number" id="wait-min" name="wait-min" min="1" max="60" defaultValue="30"/>
            <h4>Receive notifications for these restaurants:</h4>
            <div class="checks">
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
            <input type="button" class="profileButton" value="Submit Changes" onClick={this.postProfile}/>

          </div>


      </div>
    );
  }
}

export default Profile;
