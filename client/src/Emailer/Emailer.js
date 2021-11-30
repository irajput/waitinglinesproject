import React, { Component } from 'react';

var isMounted = false;

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

   async function email() {
    return fetch('http://localhost:3001/user/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'secret_token': getToken()
        'secret_token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTAyZDEyOTRiMjY0YTg5YzNlZmRmMiJ9LCJpYXQiOjE2Mzc4OTAyMjN9.eP0hFksBRU8Gdz-Xe9QAzICB5a1D4oSp5kEtPBftXmQ"
      }
    })
      .then(data => data.json())
   }


class Emailer extends Component {
    constructor(props) {
        super(props);

        this.state = {
          onCooldown: false,
        }
    }

    componentDidMount = () => {
        isMounted = true;
        // Timer which increments every second, checks if it should send emails every minute
        // Unless on cooldown, in which case it waits ten minutes
        this.myTimer = setInterval(() => {
            if (isMounted) {
                if (this.state.countUp >= 60 && !this.state.onCooldown) {
                    this.setState({countUp: 0});
                    //TODO: determine when and how to send email
                    //email()
                }
                else if (this.state.countUp >= 10*60) {
                    this.setState({countUp: 0, onCooldown: false});
                    //TODO: determine when and how to send email
                    //email()
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
