import React, { Component } from 'react';

var isMounted = false;

// The codes for fetching from waitTime
const RESTURAUNTCODES = ["BPlate", "Rendezvous","Study","Feast","BCafe","DeNeve","Epic"];


   async function sendAllEmails(restaurant) {
    return fetch('http://localhost:3001/restaurant/sendAllEmails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret_token': sessionStorage.getItem('token')
      },
      body: JSON.stringify({"name": restaurant}),
    })
   }

   async function waitTime(restaurantName) {
    return fetch('http://localhost:3001/waitTime?' + new URLSearchParams({'restaurant': restaurantName}).toString(), {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
   }

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

   async function getPreferences(restaurant) {
    //TODO: Find how to get preferences
    var data = await profile();
    var preferences = data.user.followingRestaurants; //IDS
    const IDTORESTAURANT = {"61a2931328ac130c1a866f8e":"BPlate","61a6ce86d5dd6cd7b66447e6":"Rendezvous","61a6ce8bd5dd6cd7b66447e8":"Study","61a6ce8fd5dd6cd7b66447ea":"Feast","61a6ce95d5dd6cd7b66447ec":"BCafe","61a6ce9bd5dd6cd7b66447ee":"DeNeve","61a6cea0d5dd6cd7b66447f0":"Epic"}
    var preferencesAsRestaurants = []
    for (var i = 0; i < preferences.length; i++)
    {
      preferencesAsRestaurants.push(IDTORESTAURANT[preferences[i]])
    }
    for (i = 0; i < RESTURAUNTCODES.length; i++)
    {
      if (restaurant === RESTURAUNTCODES[i]) {
        for (var j = 0; j < preferencesAsRestaurants.length; j++)
      {
        if (RESTURAUNTCODES[i] === preferencesAsRestaurants[j]) {
          return true
        }
      }
      }
    }
    return false
}

 //If restaurant wait time is below 30 mins, return true
    // should take in specific restaurant
    async function shouldSendEmail(restaurant) {
      var preferThisRestaurant = await getPreferences(restaurant);
      var waitTimePreference = 30; //TODO: get this locally?
      //TODO: try this when waitTime data ready
      // var waitTime = await waitTime(restaurant);
      var waitTime = 20;
      if (preferThisRestaurant && waitTime <= waitTimePreference) {
            return true;
      }
      return false;
    }


class Emailer extends Component {
    constructor(props) {
        super(props);

        this.state = {
          // Starting countUp at 59 so an email can happen immediately if appropriate
          countUp: 59,
        }
    }

    async componentDidMount() {
        isMounted = true;
        // Timer which increments every second, checks if it should send emails every minute
        // Unless on cooldown, in which case it waits ten minutes
        this.myTimer = setInterval(async () => {
          if (isMounted) {
            if (this.state.countUp >= 60) {
              this.setState({ countUp: 0 });
              for (var i = 0; i < 7; i++) {
                var restaurant = RESTURAUNTCODES[i];
                const should = await shouldSendEmail(restaurant);
                if (should) {
                  sendAllEmails(restaurant);
                  console.log("sending email for " + restaurant);
                }
              }

            }
            else {
              this.setState((prevState) => ({
                countUp: prevState.countUp + 1
              }));
            }
          }
        }, 1000);
    }

    componentWillUnmount = () => {
        isMounted = false;
        clearInterval(this.myTimer);
    }

    render() {
        return (
            <div>
            </div>
        );
      }
}

export default Emailer;
