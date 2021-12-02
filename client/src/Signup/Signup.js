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
      <div class="completeWrap">
      <h1 class="loginH1">Please Sign Up</h1>
      <div class="signup">

        <form onSubmit={handleSubmit}>
        <label class="signupLabel">
            <p class="loginP">Username</p>
            <input class="signupInput" type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label class="signupLabel">
            <p class="loginP">Password</p>
            <input class="signupInput" type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div className="center">
            <button class="loginButton" type="submit">Submit</button>
        </div>
        </form>
        </div>
    </div>
    </div>
  )
}