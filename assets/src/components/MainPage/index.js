// frontend/components/MainPage/MainPage.js
// frontend/components/MainPage/MainPage.js

import React, { Component } from "react";
import axios from "axios";

import MainModal from "../MainModal";
import Modal from "../Modal";
import ModelUrls from "../../constants/urls";


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      activeItem: {
        title: "",
        description: "",
      },
      itemList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get(ModelUrls.ITEMS)
      .then(res => {
        this.setState({itemList: res.data });
        console.log('test');
      })
      .catch(err => console.log(err));
  };
  toggleModal = () => {
    this.setState({toggleModal: !this.state.toggleModal});
  };
  renderItems = () => {
    return this.state.itemList.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className="todo-title mr-2"
          title={item.description}
        >
          {item.title}
        </span>
        <span
          className="todo-title mr-2"
          title={item.description}
        >
          {item.description}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(ModelUrls.ITEMS + item.id + '/', item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post(ModelUrls.ITEMS, item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(ModelUrls.ITEMS + item.id)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: ""};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
          <h1 className="text-white my-4 text-center">Django React тестовый проект</h1>
          <div className="text-center">
            <button onClick={this.toggleModal} className="btn btn-primary">
              Show/hide list
            </button>
          </div>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            {this.state.toggleModal &&
              <MainModal
                createItem={this.createItem}
                renderItems={this.renderItems}
              />}
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default MainPage;
