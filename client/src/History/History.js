import React, { useState } from 'react';

import '../Login/Login.css';

async function hist(rest) {
    let today = new Date().toLocaleDateString()
    console.log(today)
    let mhist =  await fetch('http://localhost:3001/history?' + new URLSearchParams({'name': rest}).toString() + new URLSearchParams({'date': today}).toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(data => data.json())
        if (mhist.message === "Failure") {
            alert("Invalid Restaurant")
        }
        console.log(mhist.message)
}

export default function History() {
    const [restaurant, setRestaurant] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await hist(
        restaurant);
      console.log("Got token");
      //sessionStorage.setItem('token', token);
      //document.location.reload();
    }
  
    return(
      <div className="login-wrapper">
        <h1>Please Log In</h1>
          <form onSubmit={handleSubmit}>
          <label>
              <p>Restaurant</p>
              <input type="text" onChange={e => setRestaurant(e.target.value)}/>
          </label>
          <div className="center">
              <button type="submit">Submit</button>
          </div>
          </form>
      </div>
    )
  }