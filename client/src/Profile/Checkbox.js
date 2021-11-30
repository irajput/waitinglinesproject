import './Checkbox.css';
import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          on: false,
          disabled: true
        } 
    }
    toggle() {
      if (this.state.on) {
        console.log('Turned off');
        this.setState({on: false});
      }
      else {
        console.log('Turned on');
        this.setState({on: true});
      }
    }
    render() {
        return (
            <label>
              <input type="checkbox" onClick={this.toggle} defaultChecked/>
            </label>
        );
      }
}

export default Checkbox;
