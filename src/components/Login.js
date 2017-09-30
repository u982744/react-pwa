import React from 'react';
import { Textfield, Button } from 'react-mdl';
import { Config } from "../config";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "berman.tim@gmail.com",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
        window.location.href = "#/list";
      })
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