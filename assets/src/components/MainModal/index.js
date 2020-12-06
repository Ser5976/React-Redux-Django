// frontend/src/components/MainModal.js

import React, { Component } from "react";


export default class MainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { createItem, renderItems } = this.props;
    return (
      <div className="card p-3">
        <div className="">
          <button onClick={createItem} className="btn btn-primary">
            Add item
          </button>
        </div>
        <ul className="list-group list-group-flush">
          {renderItems()}
        </ul>
      </div>
    );
  }
}