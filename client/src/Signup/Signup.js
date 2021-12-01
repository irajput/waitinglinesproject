// client/src/Login.js

import React, { useState } from 'react';

import './Signup.css';



async function signUser(email, password) {
  //try {
    console.log("signing up")

    await fetch('http://localhost:3001/signup', {

    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email":email,"password":password}),
    })
}

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await signUser(
      email,
      password);
    console.log("Signed Up");
  }

  return(
    <div className="login-wrapper">
      <h1>Please Sign Up</h1>
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