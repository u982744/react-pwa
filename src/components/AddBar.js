import React from 'react';
import { Textfield, FABButton, Icon } from 'react-mdl';

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      hint: props.hint || "Add..."
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({name: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name !== "") {
      this.props.onAdd(this.state.name);
      this.setState({name: ""});
    }
  }

  render() {
    return(
      <div className="addBar">
        <form onSubmit={ this.handleSubmit }>
          <Textfield
            onChange={ this.handleInputChange }
            label={ this.state.hint }
            value={ this.state.name }
          />
          <FABButton type="submit" mini >
            <Icon name="add" />
          </FABButton>
        </form>
      </div>
    );
  }
}