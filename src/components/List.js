import React from 'react';
import { List, ListItem, ListItemContent, ListItemAction, Checkbox, Icon } from 'react-mdl';
import { Config } from "../config";

var list = [];

function load() {
  return fetch(Config.apiUrl + "list/" + Config.userId)
  .then((response) => response.json())
  .then(data => {
    console.log("data", data);
    let list = [];
    data.result.forEach((item) => {
      list.push({id: item._id, name: item.name});
    });
    return list;
  })
}

function deleteList() {
  alert("delete");
}

function items(listId) {
  console.log(listId);
  window.location.href = "#/list/" + listId + "/items";
}

export default class ListPage extends React.Component {
  componentDidMount() {
    list = [];
    console.log('List page mounted...');
    load()
      .then(data => {
        // console.log("load done...", data);

        for (var i = 0; i < data.length; i++) {
          let id = data[i].id;

          list.push(
            <ListItem key={ id }>
              <ListItemContent onClick={() => {items(id)}}>{ data[i].name }</ListItemContent>
              <ListItemAction>
                <Icon onClick={deleteList} name="delete" />
              </ListItemAction>
            </ListItem>
          );
        }
        this.forceUpdate();
      })
  }

  render() {
    return(
      <div>
        <h1>Lists</h1>
        <List>
          {list}
        </List>
      </div>
    );
  }
}