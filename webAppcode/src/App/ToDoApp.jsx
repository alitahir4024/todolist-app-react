import React, { Component } from "react";
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./ToDoApp.css";
import "./responsive_style.css";

class ToDoListApp extends Component {
  state = {
    ToDoPrimary: "",
    ToDoSecondary: "",
    ToDoListArray: [],
    open: false,
    index: null,
  };

  HandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  HandleClick = () => {
    this.setState({
      ToDoListArray: [...this.state.ToDoListArray, this.state.ToDoPrimary],
      ToDoPrimary: "",
    });
  };

  HandleEdit = (index) => {
    this.setState({
      open: true,
      index: index,
    });
  };

  HandleUpdate = () => {
    let ToDoListArray = this.state.ToDoListArray;
    let index = this.state.index;
    ToDoListArray[index] = this.state.ToDoSecondary;
    this.setState({
      ToDoListArray: ToDoListArray,
      open: false,
    });
  };

  HandleClose = () => {
    this.setState({
      open: false,
    });
  };

  HandleClear = () => {
    this.setState({
      ToDoPrimary: "",
      ToDoListArray: [],
    });
  };

  HandleShiftUp = (index) => {
    let ToDoListArray = this.state.ToDoListArray;
    let temp = ToDoListArray[index];
    ToDoListArray[index] = ToDoListArray[index - 1];
    ToDoListArray[index - 1] = temp;
    this.setState({
      ToDoListArray: ToDoListArray,
    });
  };

  HandleShiftDown = (index) => {
    let ToDoListArray = this.state.ToDoListArray;
    let temp = ToDoListArray[index];
    ToDoListArray[index] = ToDoListArray[index + 1];
    ToDoListArray[index + 1] = temp;
    this.setState({
      ToDoListArray: ToDoListArray,
    });
  };

  HandleDelete = (index) => {
    let ToDoListArray = this.state.ToDoListArray;
    ToDoListArray.splice(index, 1);
    this.setState({
      ToDoListArray: ToDoListArray,
    });
  };

  render() {
    let response = this.state.ToDoListArray.map((todo, index) => {
      return (
        <li key={index}>
          <div>
            {" "}
            <button></button> <p> {todo} </p>{" "}
          </div>
          <div>
            <button className="edit-btn" onClick={() => this.HandleEdit(index)}>
              <i className="fas fa-pen"></i>
            </button>
            <button
              className="shift-up-btn"
              onClick={() => this.HandleShiftUp(index)}
            >
              <i className="fas fa-chevron-up"></i>
            </button>
            <button
              className="shift-down-btn"
              onClick={() => this.HandleShiftDown(index)}
            >
              <i className="fas fa-chevron-down"></i>
            </button>
            <button
              className="delete-btn"
              onClick={() => this.HandleDelete(index)}
            >
              <i className="far fa-trash-alt"></i>
            </button>{" "}
          </div>
        </li>
      );
    });
    return (
      <>
      <div className="ToDoListApp">
        <header>
          {" "}
          <button>
            <i className="fas fa-search"></i>
          </button>{" "}
          <h1>All Tasks</h1>{" "}
          <button className="sync-btn" onClick={this.HandleClear}>
            <i className="fas fa-sync-alt"></i>
          </button>{" "}
        </header>
        <ul>{response}</ul>
        <footer>
          <input
            type="text"
            name="ToDoPrimary"
            placeholder="Enter Todo"
            onChange={this.HandleChange}
            value={this.state.ToDoPrimary}
          />
          <button onClick={this.HandleClick}>
            <i className="fas fa-plus-circle"></i>
          </button>
        </footer>
      </div>
        <Modal open={this.state.open} onClose={this.HandleClose} classNames={{ modal: 'customModal', overlay: 'customOverlay',}} center>
          <input
            type="text"
            name="ToDoSecondary"
            value={this.state.ToDoListArray[this.state.index]}
            onChange={this.HandleChange}
          />
          <button className="update-btn" onClick={this.HandleUpdate}>
            Update
          </button>
        </Modal>
      </>
    );
  }
}

export default ToDoListApp;
