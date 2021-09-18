import React from "react";

import Dropdown from "./ui/Dropdown";

const Task = ({ task, onDelete = () => {} }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <ion-icon name="swap-horizontal"></ion-icon>
          {task?.title}
        </div>
        <Dropdown
          className="button icon round"
          toggleContent={<ion-icon name="ellipsis-vertical"></ion-icon>}
        >
          <Dropdown.List>
            <button>
              <ion-icon name="create-outline"></ion-icon> Edit task
            </button>
            <button className="danger" onClick={() => onDelete(task._id)}>
              <ion-icon name="trash"></ion-icon> Delete task
            </button>
          </Dropdown.List>
        </Dropdown>
      </div>
      <div className="card-body">{task?.body}</div>
      <div className="card-footer">#some tag</div>
    </div>
  );
};

export default Task;
