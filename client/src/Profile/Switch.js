import './Switch.css';
import React, { Component } from 'react';

//https://stackoverflow.com/questions/66676756/in-react-is-there-a-way-to-have-a-toggle-switch-onchange-or-onclick-switch-to
//https://reactjs.org/docs/faq-functions.html 
//https://www.washington.edu/accesscomputing/webd2/student/unit5/module2/lesson5.html 

class Switch extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          on: false
        } 
    }
    toggle() {
      var myNotificationOpts = document.getElementById("notification-opts")
      var dummyButton = document.getElementById("dummy-button")
      if (this.state.on) {
        console.log('Turned off');
        this.setState({on: false});
        myNotificationOpts.style.opacity = 0.3;
        dummyButton.style.display = "block";
      }
      else {
        console.log('Turned on');
        this.setState({on: true});
        myNotificationOpts.style.opacity = 1;
        dummyButton.style.display = "none";
      }
    }
    render() {
        return (
            <label className="switch">
              {
                <>
                  <input type="checkbox" onClick={this.toggle}/>
                  <div type="button" className="slider round">
                    <span className="on">On</span>
                    <span className="off">Off</span>
                  </div>
                </>
              }
            </label>
        );
      }
}

export default Switch;
