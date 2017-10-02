import React from 'react';
import localforage from "localforage";
import { Textfield, Button } from 'react-mdl';
import { Config } from "../config";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loaded: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // go straight to list page if already logged in
    localforage.getItem('loggedIn')
      .then((value) => {
          if (value) {
            window.location.href = "#/list";
          }
      })
      .catch((err) => {
          console.log(err);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  login() {
    let that = this;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: headers
    }

    fetch(Config.apiUrl + "login", fetchData)
      .then((response) => response.json())
      .then(data => {
        Config.token = data._id;
        Config.userEmail = data.local.email;
        Config.userId = data._id;

        localforage.setItem('token', data._id)
          .then((value) => {
            return localforage.setItem('userEmail', data.local.email);
          })
          .then((value) => {
            return localforage.setItem('userId', data._id);
          })
          .then((value) => {
            return localforage.setItem('loggedIn', true);
          })
          .then((value) => {
            this.props.onLogin();
            window.location.href = "#/list";
          })
          .catch((error) => {
            alert("localForage errors...");
            console.log("localForage errors", error);
          });
      })
      .catch((error) => {
        console.log("login error", error);
        alert("login error...");
      });
  }

  render() {
    return (
        <div>
          <h1>Login</h1>
          <div>
            <Textfield
              name="email"
              onChange={ this.handleInputChange }
              label="Email"
              style={{width: '200px'}}
              defaultValue={ this.state.email }
            />
          </div>
          <div>
            <Textfield
              name="password"
              onChange={ this.handleInputChange }
              label="Password"
              style={{width: '200px'}}
              defaultValue={ this.state.password }
              password
            />
          </div>
          <div>
            <Button raised colored onClick={ (e) => {this.login(e)} }>Sign in</Button>
          </div>
        </div>
    )
  }
}