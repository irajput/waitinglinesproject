import './Table.css';
import React, { Component } from 'react';

//https://www.w3schools.com/howto/howto_js_sort_table.asp

class Table extends Component {
    constructor(props) {
        super(props);
        this.sortName = this.sortName.bind(this);
        this.sortWait = this.sortWait.bind(this);
        this.sortCrowd = this.sortCrowd.bind(this);
        this.sortOpen = this.sortOpen.bind(this);
        this.sortClose = this.sortClose.bind(this);
        this.state = {
          sortedBy: "Name",
          wait1: 3,
          crowd1: 1,
          open1: 13,
          close1: 14,
          wait2: 20,
          crowd2: 2,
          open2: 15,
          close2: 6,
          wait3: 15,
          crowd3: 4,
          open3: 8,
          close3: 9,
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
                <div>
                    <input type="button" value="Hide" onClick={this.hide.bind(this, "1")}/>
                    <input type="button" value="Show" onClick={this.show.bind(this, "1")}/>
                    <input type="checkBox" defaultChecked/>
                    <p>Only show currently open (doesn't work right now)</p>
                </div>
                <input type="button" value="Name" onClick={this.sortName}/>
                <input type="button" value="Wait" onClick={this.sortWait}/>
                <input type="button" value="Crowd" onClick={this.sortCrowd}/>
                <input type="button" value="Open" onClick={this.sortOpen}/>
                <input type="button" value="Close" onClick={this.sortClose}/>
                <table id="table"> 
                    <tbody>
                    <tr id="1">
                        <td>Hall 1</td>
                        <td>{this.state.wait1}</td>
                        <td>{this.state.crowd1}</td>
                        <td>{this.state.open1}</td>
                        <td>{this.state.close1}</td>
                    </tr>
                    <tr id="2">
                        <td>Hall 2</td>
                        <td>{this.state.wait2}</td>
                        <td>{this.state.crowd2}</td>
                        <td>{this.state.open2}</td>
                        <td>{this.state.close2}</td>
                    </tr>
                    <tr id="3">
                        <td>Hall 3</td>
                        <td>{this.state.wait3}</td>
                        <td>{this.state.crowd3}</td>
                        <td>{this.state.open3}</td>
                        <td>{this.state.close3}</td>
                    </tr>
                    </tbody>
                </table>
                
            </div>
        );
      }
}

export default Table;
