// client/src/Login.js

import React, { useState } from 'react';

import './Login.css';



async function loginUser(email, password) {
  //try {
    let body = {"email":email,"password":password,}
    console.log(body)
    let thing = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
		body: JSON.stringify({"email":email,"password":password,}),
    })
		.then(data => data.json())
    console.log(thing)
    if (thing === "An authentication error occurred") {
      /*console.log("signing up")

      await fetch('http://localhost:3001/signup', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email":email,"password":password}),
    })

	  //console.log(thing);
	  return loginUser(email,password);*/
    alert("Invalid credentials");
    }
    console.log(thing.token);
    sessionStorage.setItem('login','true');
	  return thing.token
  //}
  /*catch (error) {
    let thing = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
		body: JSON.stringify({"email":email,"password":password}),
    })

    .then(data => data.json())
	  //console.log(thing);
	  return loginUser(email,password);
  }*/

}

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      email,
      password);
    console.log("Got token");
    sessionStorage.setItem('token', token);
    document.location.reload();
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Username</p>
            <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div className="center">
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  )
}

