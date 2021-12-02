import './Table.css';
import React, { Component } from 'react';

//https://www.w3schools.com/howto/howto_js_sort_table.asp
//https://www.youtube.com/watch?v=D6mnVcCqWcA

var isMounted = false;

async function restaurants(restaurantName) {
  return fetch('http://localhost:3001/restaurant/profile?' + new URLSearchParams({'name': restaurantName}).toString(), {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'secret_token': sessionStorage.getItem('token'),
    },
  })
    .then(data => data.json())
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

//  For testing purposes
 const logRestaurant = async e => {
    e.preventDefault();
    const restaurant = await restaurants("BCafe")
    console.log(restaurant)
  }

  const logWait = async e => {
    e.preventDefault();
    const restaurant = await waitTime("Study")
    console.log(restaurant)
  }

class RestaurantEntry {
    constructor(name, wait = 10, crowd = 0, open = "11 AM", close = "1 PM") {
        this.name = name;
        this.wait = wait;
        this.crowd = crowd;
        this.open = open;
        this.close = close;
 }
}

// The codes for fetching from waitTime
const RESTAURANTCODES = ["BPlate", "Rendezvous","Study","Feast","BCafe","DeNeve","Epic"];

class Table extends Component {
    constructor(props) {
        super(props);

        this.sortName = this.sortName.bind(this);
        this.sortWait = this.sortWait.bind(this);
        this.sortCrowd = this.sortCrowd.bind(this);
        this.sortOpen = this.sortOpen.bind(this);
        this.sortClose = this.sortClose.bind(this);
        this.convertTime = this.convertTime.bind(this);
        this.toggleShowOpen = this.toggleShowOpen.bind(this);
        this.updateRestaurants = this.updateRestaurants.bind(this);

        var Rendezvous = new RestaurantEntry("Rendezvous")
        var Study = new RestaurantEntry("Study", 25, 1, "9 PM", "12 AM")
        var Feast = new RestaurantEntry("Feast", 5, 2, "5 PM", "9 PM")
        var BCafe = new RestaurantEntry("BCafe", 18, 5, "12 PM", "3 PM")
        var DeNeve = new RestaurantEntry("DeNeve", 30, 4, "6 AM", "10 AM")
        var Epic = new RestaurantEntry("Epic", 20, 5, "5 PM", "9 PM")
        var BPlate = new RestaurantEntry("Bruin Plate", 7, 3, "5 PM", "9 PM")
        this.state = {
          sortedBy: "Name",
          showingOnlyOpen: false,
          restaurants: [Rendezvous, Study, Feast, BCafe, DeNeve, Epic, BPlate],
          countUp: 0
        }
        // Get initial restaurant info from server
        this.updateRestaurants();
    }

    componentDidMount = () => {
        isMounted = true;
        // Once table is populated, we can make it show only the open restaurants
        this.toggleShowOpen();
        // Timer which increments every second, updates restaurants every minute
        this.myTimer = setInterval(() => {
            if (isMounted) {
                if (this.state.countUp >= 60) {
                    this.setState({countUp: 0});
                    this.updateRestaurants();
                    // Not very elegant, but calling it twice in case new restaurants open with time change
                    this.toggleShowOpen();
                    this.toggleShowOpen();
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

    // Updates the restaurant entry with data from the server
    async updateRestaurants() {
        // e.preventDefault();
        console.log("updating restaurant table");
        var newRestaurants = this.state.restaurants;
        for (var i = 0; i < RESTAURANTCODES.length; i++)
        {
            try {
                const updatedRestaurant = await restaurants(RESTAURANTCODES[i]);
                //TODO: try this when waitTime data is ready
                var newWaitObject = await waitTime(RESTAURANTCODES[i]);
                console.log(newWaitObject)
                var newWait = newWaitObject.time;
                newWait = newWait / 60 //Change seconds to minutes
                newWait = newWait.toFixed(0)
                console.log(newWait) 
                // newWait = 1;
                const newCrowd = parseInt(updatedRestaurant.restaurant.crowdednessRating);
                const newOpen = updatedRestaurant.restaurant.openTime;
                const newClose = updatedRestaurant.restaurant.closeTime;
                newRestaurants[i] = new RestaurantEntry(RESTAURANTCODES[i], newWait, newCrowd, newOpen, newClose);
                this.setState({restaurants: newRestaurants});
            }
            catch {
                console.log("Error fetching restaurants. Will try again in 1 minute")
            }
        }
        this.toggleShowOpen();
        this.toggleShowOpen();
    }

    toggleShowOpen() {
        if (this.state.showingOnlyOpen) {
            console.log('showing closed');
            this.setState({showingOnlyOpen: false});
            var i;
            for (i = 0; i < this.state.restaurants.length; i++)
            {
                this.show(i.toString())
            }
          }
          else {
            console.log('showing only open');
            this.setState({showingOnlyOpen: true});
            for (i = 0; i < this.state.restaurants.length; i++)
            {
                var open_time = this.convertTime(this.state.restaurants[i].open); 
                var close_time = this.convertTime(this.state.restaurants[i].close);
                var today = new Date();
                var hour = today.getHours();
                if (open_time <= hour && hour < close_time) {}
                else {
                    this.hide(i.toString())
                }
                
            }
          }
    }

    sortName() {
        this.setState({sortedBy: "Name"});
        var table, rows, switching, i, x, y;
        table = document.getElementById("table");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];
                
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }

    sortWait() {
        this.setState({sortedBy: "Wait"});
        var table, rows, switching, i, x, y;
        table = document.getElementById("table");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[1];
                y = rows[i + 1].getElementsByTagName("TD")[1];
                //Note that using parseInt
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }

    sortCrowd() {
        this.setState({sortedBy: "Crowd"});
        var table, rows, switching, i, x, y;
        table = document.getElementById("table");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[2];
                y = rows[i + 1].getElementsByTagName("TD")[2];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }

    // Converts the time as displayed in table into military time for easy comparison
    convertTime(timeStr) {
        var digits = parseInt(timeStr.replace(/\D/g, ""));
        var amorpm = timeStr.replace(/[^a-zA-Z]+/g, "");
        // assumption: latest close time will be midnight, aka 12 AM
        if ((amorpm === "PM" && digits !== 12) || (digits === 12 && amorpm === "AM"))
        {
            digits += 12
        }
        return digits;
    }

    sortOpen() {
        this.setState({sortedBy: "Open"});
        var table, rows, switching, i, x, y;
        table = document.getElementById("table");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[3];
                y = rows[i + 1].getElementsByTagName("TD")[3];
                //Note that using convertTime instead
                if (this.convertTime(x.innerHTML) > this.convertTime(y.innerHTML)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }

    sortClose() {
        this.setState({sortedBy: "Close"});
        var table, rows, switching, i, x, y;
        table = document.getElementById("table");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[4];
                y = rows[i + 1].getElementsByTagName("TD")[4];
                //Note that < is flipped here and using convertTime instead
                if (this.convertTime(x.innerHTML) < this.convertTime(y.innerHTML)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }

    hide(idString) {
        try {
        var row = document.getElementById(idString);
        row.style.display = "none";
        }
        catch {

        }
    }

    show(idString) {
        try {
        var row = document.getElementById(idString);
        row.style.display = "table-row";
        }
        catch {

        }
    }


    render() {
        // const { countUp } = this.state;
        return (
            <div>
                {/* <p>{countUp}</p> */}
                <p className = "tableP">Updates every minute</p>
                {/* <input type="button" value="Log restaurant" onClick={logRestaurant}/>
                <input type="button" value="Log wait time" onClick={logWait}/> */}
                <div>
                    <input type="checkBox" onClick={this.toggleShowOpen} defaultChecked/>
                    <p className = "tableP">Only show currently open</p>
                </div>
                <input type="button" className = "tableInputs" value="Name" onClick={this.sortName}/>
                <input type="button" className = "tableInputs" value="Wait (min)" onClick={this.sortWait}/>
                <input type="button" className = "tableInputs" value="Crowd" onClick={this.sortCrowd}/>
                <input type="button" className = "tableInputs" value="Open" onClick={this.sortOpen}/>
                <input type="button" className = "tableInputs" value="Close" onClick={this.sortClose}/>
                <table id="table"> 
                    <tbody>
                    <tr id="0">
                        <td>{this.state.restaurants[0].name}</td>
                        <td>{this.state.restaurants[0].wait}</td>
                        <td>{this.state.restaurants[0].crowd}</td>
                        <td>{this.state.restaurants[0].open}</td>
                        <td>{this.state.restaurants[0].close}</td>
                    </tr>
                    <tr id="1">
                        <td>{this.state.restaurants[1].name}</td>
                        <td>{this.state.restaurants[1].wait}</td>
                        <td>{this.state.restaurants[1].crowd}</td>
                        <td>{this.state.restaurants[1].open}</td>
                        <td>{this.state.restaurants[1].close}</td>
                    </tr>
                    <tr id="2">
                        <td>{this.state.restaurants[2].name}</td>
                        <td>{this.state.restaurants[2].wait}</td>
                        <td>{this.state.restaurants[2].crowd}</td>
                        <td>{this.state.restaurants[2].open}</td>
                        <td>{this.state.restaurants[2].close}</td>
                    </tr>
                    <tr id="3">
                        <td>{this.state.restaurants[3].name}</td>
                        <td>{this.state.restaurants[3].wait}</td>
                        <td>{this.state.restaurants[3].crowd}</td>
                        <td>{this.state.restaurants[3].open}</td>
                        <td>{this.state.restaurants[3].close}</td>
                    </tr>
                    <tr id="4">
                        <td>{this.state.restaurants[4].name}</td>
                        <td>{this.state.restaurants[4].wait}</td>
                        <td>{this.state.restaurants[4].crowd}</td>
                        <td>{this.state.restaurants[4].open}</td>
                        <td>{this.state.restaurants[4].close}</td>
                    </tr>
                    <tr id="5">
                        <td>{this.state.restaurants[5].name}</td>
                        <td>{this.state.restaurants[5].wait}</td>
                        <td>{this.state.restaurants[5].crowd}</td>
                        <td>{this.state.restaurants[5].open}</td>
                        <td>{this.state.restaurants[5].close}</td>
                    </tr>
                    <tr id="6">
                        <td>{this.state.restaurants[6].name}</td>
                        <td>{this.state.restaurants[6].wait}</td>
                        <td>{this.state.restaurants[6].crowd}</td>
                        <td>{this.state.restaurants[6].open}</td>
                        <td>{this.state.restaurants[6].close}</td>
                    </tr>
                    </tbody>
                </table>
                
            </div>
        );
      }
}

export default Table;
