import React from 'react';
import { Textfield, FABButton, Icon } from 'react-mdl';

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      hint: props.hint || "Add..."
    };

    this.add = this.add.bind(this);
  }

  add() {
    if (this.state.name !== "") {
      this.props.onAdd(this.state.name);
      this.setState({name: ""});
    }
  }

  render() {
    return(
      <div className="addBar">
        <Textfield
          onChange={(event) => { this.setState({name: event.target.value}) }}
          label={ this.state.hint }
          value={ this.state.name }
        />
        <FABButton mini onClick={ this.add }>
          <Icon name="add" />
        </FABButton>
      </div>
    );
  }
}