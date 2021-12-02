import React, { useState } from 'react';

import '../Login/Login.css';

import HChart from './HChart'

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'DeNeve',
          hist: [], 
        };
        sessionStorage.setItem('restaurantt', 'DeNeve')
        sessionStorage.setItem('hist', JSON.stringify([]))
        this.handleChangeR = this.handleChangeR.bind(this);
        this.handleChangeD = this.handleChangeD.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeR(event) {
          this.setState({value: event.target.value});
          console.log(event.target.value);
          sessionStorage.setItem('restaurantt', event.target.value);
      }

      handleChangeD(event) {
        this.setState({value: event.target.value});
        console.log(event.target.value);
        sessionStorage.setItem('Date', event.target.value);
    }

      async handleSubmit(event) {
        event.preventDefault();
        let mrest = sessionStorage.getItem('restaurantt')
        let today = sessionStorage.getItem('Date')

        let mhist =  await fetch('http://localhost:3001/history?' + new URLSearchParams({'name': mrest, 'date': today}).toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(data => data.json())
        console.log(mhist)
        if (mhist.message === 'Failure') {
            alert('No data for given input');
        }
        sessionStorage.setItem('hist', JSON.stringify(mhist.values));
        this.setState({
            hist: mhist.values,
        });

    }

      render() {
        return (
            <div className="Pred">
                <div className="Predictor">
                    <HChart points={this.state.hist}/>
                </div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Historical Values:
                    <label>
                        Restaurant
                        <input type="text" onChange={this.handleChangeR}/>
                    </label>
                    <label>
                        Date (YYYY-MM-DD)
                        <input type="text" onChange={this.handleChangeD}/>
                    </label>
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
      );
    }
}

export default History;