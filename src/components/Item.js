import React from 'react';
import { Textfield, FABButton, Button, List, ListItem, ListItemContent, ListItemAction, Checkbox, Icon } from 'react-mdl';
import { Config } from "../config";

var items = [];
var listId;
var listName;
var newText = "";

export default class ItemPage extends React.Component {
  componentDidMount() {
    items = [];
    listId = this.props.match.params.listId;
    console.log('Item page mounted...');
    this.load(listId)
      .then(data => {
        // console.log("load done...", data);

        for (var i = 0; i < data.length; i++) {
          let id = data[i].id;

          items.push(
            <ListItem key={ id }>
              <ListItemContent>{ data[i].name }</ListItemContent>
              <ListItemAction>
                <Icon name="delete" onClick={() => { this.deleteItem(id, listId) }} />
              </ListItemAction>
            </ListItem>
          );
        }
        this.forceUpdate();
      })
  }

  load(listId) {
    return fetch(Config.apiUrl + "list/" + listId + "/item")
    .then((response) => response.json())
    .then(data => {
      let list = [];
      listName = data.name;
      data.result.forEach((item) => {
        list.push({id: item._id, name: item.name});
      });
      console.log("list of stuff", list);
      return list;
    })
  }

  add(name, listId) {
    var that = this;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    let fetchData = {
      method: 'POST',
      body: JSON.stringify({ name: name, creatorId: Config.userId}),
      headers: headers
    }
    fetch(Config.apiUrl + "list/" + listId + "/item", fetchData)
      .then((response) => response.json())
      .then(data => {
        console.log("new item created...", data);
        items.push(
          <ListItem key={ data.id }>
            <ListItemContent>{ name }</ListItemContent>
            <ListItemAction>
              <Icon name="delete" onClick={() => { this.deleteItem(data.id, listId) }} />
            </ListItemAction>
          </ListItem>
        );
        that.forceUpdate();
      })
  }

  deleteItem(itemId, listId) {
    var that = this;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    let fetchData = {
      method: 'DELETE',
      headers: headers
    }
  
    fetch(Config.apiUrl + "list/" + listId + "/item/" + itemId, fetchData)
      .then(() => {
        console.log("item deleted...");

        items = items.filter(item => {
          console.log(item, itemId);
          return item.key != itemId;
        });

        that.forceUpdate();
      })
  }

  render() {
    return(
      <div>
        <h1>{ listName }</h1>
        <Textfield
          onChange={(event) => { newText = event.target.value }}
          label="Add new item..."
          style={{width: '200px'}}
        />
        <FABButton mini onClick={() => { this.add(newText, listId) }}>
          <Icon name="add" />
        </FABButton>
        <List>
          {items}
        </List>
      </div>
    );
  }
}