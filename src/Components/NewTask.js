import React, { Component } from "react";

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  handleClose = () => {
    this.props.handleClose(false);
  };
  handleChange = e => {
    let val = e.target.value;
    this.setState({ content: val });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleNewTask(this.state.content);
    this.setState({ content: "" });
    this.props.handleClose(false);
  };
  render() {
    return (
      <div className="container-popup">
        <div className="popupScreen">
          <span className="closebtn right" onClick={this.handleClose}>
            &#10005;
          </span>
          <p>Add New Task</p>
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.content}
              type="text"
              placeholder="type and click enter to submit"
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default NewTask;
