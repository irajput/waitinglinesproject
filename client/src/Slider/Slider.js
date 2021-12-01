

import React from "react";
import getToken from "../App/App"


class HallForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'De Neve',
      choice: '1',
    };

    this.handleChoice = this.handleChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleChoice(event) {
    this.setState({choice: event.target.value});
  }

  handleSubmit(event) {
    alert('You submitted data for: ' + this.state.value + " val: " + this.state.choice);
    event.preventDefault();
    console.log(getToken());
    
    let body = {
      "name" : this.state.value,
      "sliderNum": this.state.choice
    };
    
    return fetch('http://localhost:3001/restaurant/updateSlider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret_token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(body)

       })
       .then(data => console.log(data))
    
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <label>
          Which Dining Hall:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="DeNeve">De Neve</option>
            <option value="Rendezvous">Rendezvous</option>
            <option value="Study">The Study</option>
            <option value="Feast">Feast</option>
            <option value="BCafe">BCafe</option>
            <option value="Epic">Epicuria</option>
            <option value="Bplate">Bplate</option>
          </select>
        </label>

        <label>
          How Crowded Is It:
          <select value={this.state.choice} onChange={this.handleChoice}>
            <option value="1">Not Busy</option>
            <option value="2">Slightly Busy</option>
            <option value="3">Moderately Busy</option>
            <option value="4">Busy</option>
            <option value="5">Extremely Busy</option>

          </select>
        </label>

        <input type="submit" value="Submit" />
      </form>

    );
  }
}

export default HallForm