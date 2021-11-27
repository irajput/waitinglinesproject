import React from 'react';
import Chart from './Chart'

class Predictions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'De Neve',
          preds: [], 
        };
        sessionStorage.setItem('restaurant', 'De Neve')
        sessionStorage.setItem('preds', [])
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    
      handleChange(event) {
          this.setState({value: event.target.value});
          console.log(event.target.value);
          sessionStorage.setItem('restaurant', event.target.value);
      }

      handleSubmit(event) {
        alert('You submitted data for: ' + this.state.value);
        event.preventDefault();
        mrest = sessionStorage.getItem('restaurant')
        
        mpreds =  fetch('http://localhost:3001/prediction', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'secret_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxYTEyNWM0YTVmZDJkNjM0NGQwNGE5OCJ9LCJpYXQiOjE2Mzc5ODg2NTR9.c2S3ITwUkUZ0P8_OL6a0Nc1GMUx6XQ2l2M-Fe9QFbW4'
        },
        body: {"restaurant":mrest,},
    })
    sessionStorage.setItem('preds', mpreds);
}

      render() {
        return (
            <div className="Pred">
                <div className="Predictor">
                    <Chart />
                </div>
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
            </div>
      );
    }
}