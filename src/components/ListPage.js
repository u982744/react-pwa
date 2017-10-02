import React from 'react';
import localforage from "localforage";
import { List, ListItem, ListItemContent, ListItemAction, Checkbox, Icon, Spinner } from 'react-mdl';
import { Config } from "../config";
import AddBar from "./AddBar";

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoaded: false
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {

    Config.getStored()
      .then(config => {
        Config.update(config);

        localforage.getItem('loggedIn')
          .then((value) => {
              if (!value) {
                window.location.href = "#/login";
              } else {
                localforage.getItem('userId')
                  .then((value) => {
                      this.createList(value);
                  })
                  .catch((err) => {
                      console.log(err);
                  });
              }
          })
          .catch((err) => {
              console.log(err);
          });
      });
  }

  createList(userId) {
    this.load()
      .then(data => {
        let list = [];
        // console.log("load done...", data);
        for (var i = 0; i < data.length; i++) {
          let id = data[i].id;

          list.push(
            <ListItem key={ id }>
              <ListItemContent onClick={ () => {this.items(id)} }>{ data[i].name }</ListItemContent>
              <ListItemAction>
                <Icon name="delete" onClick={() => { this.deleteList(id) }} />
              </ListItemAction>
            </ListItem>
          );
        }

        this.setState({list: list}, () => {
          this.setState({isLoaded: true});
        });
      })
  }

  load() {
    return fetch(Config.apiUrl + "list/" + Config.userId)
    .then((response) => response.json())
    .then(data => {
      let list = [];
      data.result.forEach((item) => {
        list.push({id: item._id, name: item.name});
      });
      return list;
    })
  }

  deleteList(listId) {
    this.setState({isLoaded: false}, () => {
      var that = this;
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
    
      let fetchData = {
        method: 'DELETE',
        headers: headers
      }
    
      fetch(Config.apiUrl + "list/" + listId, fetchData)
        .then(() => {
          let filteredItems = that.state.list.filter(item => {
            return item.key != listId;
          });
  
          that.setState({list: filteredItems, isLoaded: true});
        })
    });
  }

  handleAdd(name) {
    this.setState({isLoaded: false}, () => {
      let that = this;
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
  
      let fetchData = {
        method: 'POST',
        body: JSON.stringify({ name: name, userId: Config.userId}),
        headers: headers
      }
      fetch(Config.apiUrl + "list", fetchData)
        .then((response) => response.json())
        .then(data => {
          that.state.list.push(
            <ListItem key={ data.id }>
              <ListItemContent onClick={ () => {this.items(data.id)} }>{ name }</ListItemContent>
              <ListItemAction>
                <Icon name="delete" onClick={() => { this.deleteList(data.id) }} />
              </ListItemAction>
            </ListItem>
          );
          that.setState({list: that.state.list, isLoaded: true});
        })
    });
  }

  items(listId) {
    window.location.href = "#/list/" + listId + "/items";
  }

  render() {
    let content;

    if (this.state.isLoaded) {
      content = (
        <div>
          <h3>Lists</h3>
          <AddBar
            hint="Add new list..."
            onAdd={this.handleAdd}
          />
          <List>
            { this.state.list }
          </List>
        </div>
      );
    } else {
      content = <Spinner singleColor />;
    }
    return(
      <div>
        {content}
      </div>
    );
  }
}