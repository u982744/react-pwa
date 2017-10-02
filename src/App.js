import React, { Component } from 'react';
import localforage from "localforage";
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Header, Drawer, Navigation, Content, Spinner } from 'react-mdl';

import { Config } from "./config";
import LoginPage from './components/LoginPage';
import ListPage from './components/ListPage';
import ItemPage from './components/ItemPage';

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'lists',
  storeName   : 'listsStore' // Should be alphanumeric, with underscores.
});

// const baseFolder = "/react-pwa";
const baseFolder = "";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Config.loggedIn,
      loaded: false
    };

    this.logout = this.logout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    localforage.getItem('loggedIn').then(value => {
      this.setState({loggedIn: value}, () => {
        this.setState({loaded: true});
      });
    })
      .catch(err => {
        console.log(err);
      });
  }

  logout() {
    Config.token = "";
    Config.userEmail = "";
    Config.userId = "";
    Config.loggedIn = false;

    this.setState({loggedIn: false}, () => {
      localforage.removeItem('token')
        .then((value) => {
          return localforage.removeItem('userEmail');
        })
        .then((value) => {
          return localforage.removeItem('userId');
        })
        .then((value) => {
          return localforage.removeItem('loggedIn');
        })
        .then(value => {
          this.forceUpdate();
          if (document.querySelector('.mdl-layout__drawer')) {
            document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
            document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
          }
          window.location.href = "#/login";
        })
        .catch((error) => {
          alert("localForage logout errors...");
          console.log("localForage logout errors", error);
        });
    });
  }

  handleLogin() {
    this.setState({loggedIn: true}, () => {
      this.forceUpdate();
    });
  }

  render() {
    let content;
    let loginOutLink;

    if (this.state.loaded) {
      content = (
        <Content>
          <Route exact path={baseFolder + "/"} render={ ()=><LoginPage onLogin={ this.handleLogin } /> } />
          <Route exact path={baseFolder + "/list"} component={ ListPage } />
          <Route exact path={baseFolder + "/login"} render={ ()=><LoginPage onLogin={ this.handleLogin } /> } />
          <Route path={baseFolder + "/list/:listId/items"} component={ ItemPage }/>
        </Content>
      );
    } else {
      content = <Spinner singleColor />;
    }

    if (this.state.loggedIn) {
      loginOutLink = <a onClick={ this.logout }>Logout</a>;
    } else {
      loginOutLink = <Link to="/login">Login</Link>;
    }

    return (
      <Router>
      <div>
        <Layout fixedHeader>
          <Header title="Lists"/>
          <Drawer title="Menu">
            <Navigation>
              { loginOutLink }
            </Navigation>
          </Drawer>
          { content }
        </Layout>
      </div>
    </Router>
    )
  }
}