import './Table.css';
import React, { Component } from 'react';

//https://www.w3schools.com/howto/howto_js_sort_table.asp

// async function restaurants() {
//   return fetch('http://localhost:3001/restaurant/profile', {
//     mode: 'no-cors',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     // body: {"name": "Bruin Plate"},
//   })
//     .then(data => data.json())
//  }

//  function logRestaurant() {
//     console.log(restaurants())
//  }

class RestaurantEntry {
    constructor(name, wait = 10, crowd = 1, open = 12, close = 12) {
        this.name = name;
        this.wait = wait;
        this.crowd = crowd;
        this.open = open;
        this.close = close;
 }
}


class Table extends Component {
    constructor(props) {
        super(props);
        this.sortName = this.sortName.bind(this);
        this.sortWait = this.sortWait.bind(this);
        this.sortCrowd = this.sortCrowd.bind(this);
        this.sortOpen = this.sortOpen.bind(this);
        this.sortClose = this.sortClose.bind(this);

        var Rendezvous = new RestaurantEntry("Rendezvous")
        var Study = new RestaurantEntry("Study")
        var Feast = new RestaurantEntry("Feast")
        var BCafe = new RestaurantEntry("BCafe")
        var DeNeve = new RestaurantEntry("DeNeve")
        var Epic = new RestaurantEntry("Epic")
        var BPlate = new RestaurantEntry("BPlate")
        this.state = {
          sortedBy: "Name",
          restaurants: [Rendezvous, Study, Feast, BCafe, DeNeve, Epic, BPlate],
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
                //Note that using parseInt instead
                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
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
                //Note that < is flipped here and using parseInt instead
                if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        }
    }

    hide(idString) {
        var row = document.getElementById(idString);
        row.style.display = "none";
    }

    show(idString) {
        var row = document.getElementById(idString);
        row.style.display = "table-row";
    }


    render() {
        return (
            <div>
                {/* <input type="button" value="Log restaurant" onClick={logRestaurant()}/> */}
                <div>
                    <input type="button" className = "tableInputs" value="Hide" onClick={this.hide.bind(this, "1")}/>
                    <input type="button" className = "tableInputs" value="Show" onClick={this.show.bind(this, "1")}/>
                    <input type="checkBox" defaultChecked/>
                    <p className = "tableP">Only show currently open (doesn't work right now)</p>
                </div>
                <input type="button" className = "tableInputs" value="Name" onClick={this.sortName}/>
                <input type="button" className = "tableInputs" value="Wait" onClick={this.sortWait}/>
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
