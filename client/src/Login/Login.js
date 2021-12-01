// client/src/Login.js

import React, { useState } from 'react';

import './Login.css';


async function loginUser(email, password) {
  try {
    let body = {"email":email,"password":password,}
    console.log(body)
    return fetch('http://localhost:3001/login', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {"email":email,"password":password,},
    })
    .then(data => data.json())
  }
  catch (error) {
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {"email":email,"password":password}
    })
    
    return loginUser(email, password);
  }
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
    setToken(token);
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