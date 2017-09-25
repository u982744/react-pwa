import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';

import Login from './components/Login';
import List from './components/List';
import Item from './components/Item';

const routes = [
  { 
    path: '/list/:id/items',
    component: Item
  }
]

const RouteHideDrawer = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => {
    if (document.querySelector('.mdl-layout__drawer')) {
      document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
      document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
    }
    return <Component/>
  }}/>
)

export default () => (
  <Router>
    <div>
      <Layout fixedHeader>
        <Header title="Lists"/>
        <Drawer title="Menu">
          <Navigation>
            <Link to="/">Login</Link>
          </Navigation>
        </Drawer>
        <Content>
          <RouteHideDrawer exact path="/" component={ Login } />
          <RouteHideDrawer exact path="/list" component={ List } />
          <Route path="/list/:listId/items" component={Item}/>
        </Content>
      </Layout>
    </div>
  </Router>
);
