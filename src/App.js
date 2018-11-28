import React, { Component } from "react";
import { render } from "react-dom";

import NewTask from "./Components/NewTask";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "Learn Angular", category: "wip", bgColor: "#9fa8da" },
        { name: "Learn React", category: "wip", bgColor: "#9fa8da" },
        { name: "Learn Vue", category: "complete", bgColor: "#e57373" }
      ],
      isClicked: false
    };
  }

  onDragOver = e => {
    e.preventDefault();
  };

  onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  onDrop = (e, cat) => {
    let id = e.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter(task => {
      if (task.name == id) {
        task.category = cat;
        if (cat == "complete") {
          task.bgColor = "#e57373";
        } else {
          task.bgColor = "#9fa8da";
        }
      }
      return task;
    });

    this.setState({ ...this.state.tasks, tasks });
  };

  handleAddNew = () => {
    let val = this.state.isClicked ? false : true;
    this.setState({ isClicked: val });
  };

  handleClose = obj => {
    this.setState({ isClicked: obj });
  };

  handleNewTask = content => {
    const task = {};
    task.name = content;
    task.bgColor = "#9fa8da";
    task.category = "wip";
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };

  render() {
    const tasks = {
      wip: [],
      complete: []
    };
    this.state.tasks.forEach(t => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={e => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ background: t.bgColor }}
        >
          {t.name}
        </div>
      );
    });
    const loader = this.state.isClicked ? (
      <NewTask
        handleNewTask={this.handleNewTask}
        handleClose={this.handleClose}
      />
    ) : null;
    return (
      <div className="container-drag">
        {loader}
        <p className="header">Drag & Drop</p>

        <div
          className="wip"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "wip")}
        >
          <span className="task-header">Work in Progress</span>
          {tasks.wip}
          <span>
            <a className="btn-floating btn">
              <i className="material-icons" onClick={this.handleAddNew}>
                add
              </i>
            </a>
          </span>
        </div>

        <div
          className="droppable"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "complete")}
        >
          <span className="task-header">Completed</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}

export default App;
