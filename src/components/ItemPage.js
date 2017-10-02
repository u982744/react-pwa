import React from 'react';
import { Textfield, FABButton, Button, List, ListItem, ListItemContent, ListItemAction, Checkbox, Icon, Spinner } from 'react-mdl';
import { Config } from "../config";
import AddBar from "./AddBar";

export default class ItemPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      listId: null,
      listName: null,
      newText: "",
      isLoaded: false
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.setState({listId: this.props.match.params.listId}, () => {
      this.load(this.state.listId)
        .then(data => {
          let items = [];
  
          for (var i = 0; i < data.length; i++) {
            let id = data[i].id;
  
            items.push(
              <ListItem key={ id }>
                <ListItemContent>{ data[i].name }</ListItemContent>
                <ListItemAction>
                  <Icon name="delete" onClick={() => { this.deleteItem(id, this.state.listId) }} />
                </ListItemAction>
              </ListItem>
            );
          }
          this.setState({items: items}, () => {
            this.setState({isLoaded: true});
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  load(listId) {
    return fetch(Config.apiUrl + "list/" + listId + "/item")
      .then((response) => response.json())
      .then(data => {
        let list = [];
        this.setState({listName: data.name});
        data.result.forEach((item) => {
          list.push({id: item._id, name: item.name});
        });
        return list;
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAdd(name) {
    this.setState({isLoaded: false}, () => {
      let listId = this.state.listId;
      
      let that = this;
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
          that.state.items.push(
            <ListItem key={ data.id }>
              <ListItemContent>{ name }</ListItemContent>
              <ListItemAction>
                <Icon name="delete" onClick={() => { this.deleteItem(data.id) }} />
              </ListItemAction>
            </ListItem>
          );
          that.setState({items: that.state.items, isLoaded: true});
        })
    })
  }

  deleteItem(itemId) {
    this.setState({isLoaded: false}, () => {
      let that = this;
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
    
      let fetchData = {
        method: 'DELETE',
        headers: headers
      }
    
      fetch(Config.apiUrl + "list/" + this.state.listId + "/item/" + itemId, fetchData)
        .then(() => {
          let filteredItems = that.state.items.filter(item => {
            return item.key != itemId;
          });
  
          that.setState({items: filteredItems, isLoaded: true});
        })
    });
    
  }

  render() {
    let content;

    if (this.state.isLoaded) {
      content = (
        <div>
          <h3>{ this.state.listName }</h3>
          <AddBar
            hint="Add new item..."
            onAdd={this.handleAdd}
          />
          <List>
            { this.state.items }
          </List>
        </div>
      );
    } else {
      content = <Spinner singleColor />;
    }

    return(
      <div>
        { content }
      </div>
    );
  }
}