import { useState } from "react";
import React from "react";
import ReactSlider from "react-slider";


import Step from "./Step";
import Slider from "./SliderInd/sliderIndex.js";
import "./styles.css";

{/*

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const _handleIndexChange = (index) => {
    setCurrentIndex(index);
    console.log("index:" , index)

  };

  return (
    <div className="App">
      <div className="container">
        <Step currentIndex={currentIndex} />
      </div>
      <Slider onChange={_handleIndexChange} currentIndex={currentIndex} />

      <h1 className="whichDH"> Which Dining Hall: </h1>
      <select className="dropdown">
        <option selected value = "DeNeve">De Neve</option>
        <option value = "Rende">Rendezvous</option>
      </select>
    </div>


  );
}
*/}

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

    
    return fetch('http://localhost:3001/restaurant/updateSlider', {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'secret_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTEyNWM0YTVmZDJkNjM0NGQwNGE5OCJ9LCJpYXQiOjE2Mzc5ODg2NTR9.c2S3ITwUkUZ0P8_OL6a0Nc1GMUx6XQ2l2M-Fe9QFbW4'
    },
    body: {
      name: this.state.value,
      sliderNum: this.state.choice
    }
  })

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