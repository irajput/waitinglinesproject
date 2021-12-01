import React from 'react';
import Chart from './Chart'

class Predictions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'DeNeve',
          preds: [], 
        };
        sessionStorage.setItem('restaurant', 'DeNeve')
        sessionStorage.setItem('preds', JSON.stringify([]))
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    
      handleChange(event) {
          this.setState({value: event.target.value});
          console.log(event.target.value);
          sessionStorage.setItem('restaurant', event.target.value);
      }

      async handleSubmit(event) {
        event.preventDefault();
        let mrest = sessionStorage.getItem('restaurant')
        //console.log(mrest)
        //console.log('http://localhost:3001/prediction?' + new URLSearchParams({'restaurant': mrest}).toString())

        //let mpreds = []
        let mpreds =  await fetch('http://localhost:3001/prediction?' + new URLSearchParams({'restaurant': mrest}).toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(data => data.json())
        console.log(mpreds)
        //console.log(mpreds.points)
        sessionStorage.setItem('preds', JSON.stringify(mpreds.points));
        this.setState({
            preds: mpreds.points,
        });
        //this.setState();
        //Chart();
        //this.render();
    }

      render() {
        return (
            <div className="Pred">
                <div className="Predictor">
                    <Chart points={this.state.preds}/>
                </div>
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
                <input type="submit" value="Submit" />
      </form>
            </div>
      );
    }
}

export default Predictions;