import React, { Component } from 'react';

var isMounted = false;

// The codes for fetching from waitTime
const RESTURAUNTCODES = ["BPlate", "Rendezvous","Study","Feast","BCafe","DeNeve","Epic"];


   async function sendAllEmails(restaurant) {
    return fetch('http://localhost:3001/restaurant/sendAllEmails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'name': restaurant
      }
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


class Emailer extends Component {
    constructor(props) {
        super(props);

        this.sendEmail = this.sendEmail.bind(this);
        this.shouldSendEmail = this.sendEmail.bind(this);

        this.state = {
          onCooldown: false,
          // Starting countUp at 59 so an email can happen immediately if appropriate
          countUp: 59,
        }
    }

    async getPreferences() {
        //TODO: Find how to get preferences
        return [true,true,true,false,false,true,true]
    }

    async sendEmail(restaurant) {
        console.log("sending email")
        sendAllEmails(restaurant)
      }

    //If restaurant wait time is below 30 mins, return true
    // should take in specific restaurant
    async shouldSendEmail(restaurant) {
        var preferThisRestaurant = this.getPreferences(restaurant);
        var waitTimePreference = 30; //TODO: get this locally?
        //TODO: how to get restaurant wait times
        var waitTime = await waitTime(restaurant);
        if (preferThisRestaurant && waitTime <= waitTimePreference) {
              return true;
        }
        return false;
      }

    componentDidMount = () => {
        isMounted = true;
        // Timer which increments every second, checks if it should send emails every minute
        // Unless on cooldown, in which case it waits ten minutes
        this.myTimer = setInterval(() => {
            if (isMounted) {
                if (this.state.countUp >= 60 && !this.state.onCooldown) {
                    this.setState({countUp: 0});
                    for (var i = 0; i < 7; i++) {
                      restaurant = RESTURAUNTCODES[i];
                      if (this.shouldSendEmail(restaurant))
                      {
                          this.sendEmail(restaurant);
                          this.setState({onCooldown: true});
                      }
                    }
                    
                }
                else if (this.state.countUp >= 10*60) {
                    // Reset countUp to 60 so that an email can be sent immediately if it is needed
                    this.setState({countUp: 60, onCooldown: false});
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
