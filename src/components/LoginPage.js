import React from 'react';
import localforage from "localforage";
import { Textfield, Button, Spinner } from 'react-mdl';
import { Config } from "../config";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "berman.tim@gmail.com",
      password: "Shiznit!",
      isLoaded: false,
      isRegistering: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // go straight to list page if already logged in
    localforage.getItem('loggedIn')
      .then((value) => {
          if (value) {
            window.location.href = "#/list";
          } else {
            this.setState({isLoaded: true});
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

  register() {
    let that = this;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: headers
    }

    fetch(Config.apiUrl + "signup", fetchData)
      .then(() => {
        alert("Your account was successfully created.");
        this.setState({isLoaded: true, isRegistering: false});
      })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoaded: false});

    if (this.state.isRegistering) {
      this.register();
    } else {
      this.login();
    }
  }

  render() {
    let content;

    if (this.state.isLoaded) {
      content = (
        <div>
          <h3>{ this.state.isRegistering ? "Register" : "Login" }</h3>
          <form onSubmit={this.handleSubmit}>
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
              <Button type="submit" raised colored>{ this.state.isRegistering ? "Sign up" : "Sign in" }</Button>
            </div>
          </form>
          <div>
            <p>&nbsp;</p>
            <p>Need an account? <a onClick={ () => {this.setState({isRegistering: true})} }>Sign up</a></p>
            <p><a onClick={ () => {this.setState({isRegistering: false})} }>Back to login</a></p>
          </div>
        </div>
      );
    } else {
      content = <Spinner singleColor />;
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}