import React from 'react';
import './Stopwatch.css';
import Timer from "./Timer"

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'De Neve', 
        };
        sessionStorage.setItem('restaurant', 'De Neve')
        this.handleChange = this.handleChange.bind(this);
      }
    
    
      handleChange(event) {
          this.setState({value: event.target.value});
          console.log(event.target.value);
          sessionStorage.setItem('restaurant', event.target.value);
      }

      render() {
        return (
            <div className="Stop">
            <div className="Stopwatch">
            <Timer />
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

  

export default Stopwatch;