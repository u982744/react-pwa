import React from 'react';
import { Textfield, Button } from 'react-mdl';
import { Config } from "../config";

const email = "berman.tim@gmail.com";
let password = "";

function login() {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  let fetchData = {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password}),
      headers: headers
  }
  fetch(Config.apiUrl + "login", fetchData)
    .then((response) => response.json())
    .then(data => {
      Config.token = data._id;
      Config.userEmail = data.local.email;
      Config.userId = data._id;
      window.location.href = "#/list";
    })
}

export default () => (
  <div>
    <h1>Login</h1>
    <div>
      <Textfield
        onChange={() => {}}
        label="Email"
        style={{width: '200px'}}
        value={ email }
      />
    </div>
    <div>
      <Textfield
        onChange={(e) => {password = e.target.value}}
        label="Password"
        style={{width: '200px'}}
        password
      />
    </div>
    <div>
      <Button raised colored onClick={login}>Sign in</Button>
    </div>
  </div>
);