// client/src/Login.js

import React, { useState } from 'react';

import './Login.css';

function setToken(userToken) {
  console.log(userToken)
  sessionStorage.setItem('token', userToken);
}

async function loginUser(memail, mpassword) {
  try {
    let body = {"email":memail,"password":mpassword,}
    console.log(body)
    let res = await fetch('http://localhost:3001/login', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {"email":memail,"password":mpassword,},
    })
    console.log(res.json());
    return res.json();
  }
  catch (error) {
    await fetch('http://localhost:3001/signup', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {"email":memail,"password":mpassword}
    })
    return loginUser(memail, mpassword);
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
    sessionStorage.setItem('token', token);
    //setToken(token);
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