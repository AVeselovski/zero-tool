import React from "react";

import Dropdown from "@components/ui/Dropdown";
import Loader from "@components/ui/Loader";

const Task = ({
  task,
  isSubmitting = false,
  onDelete = () => {},
  onEdit = () => {},
  onMove = () => {},
}) => {
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
            <button
              className="button"
              disabled={isSubmitting}
              onClick={() => onEdit(task._id)}
            >
              <ion-icon name="create-outline"></ion-icon> Edit task
            </button>
            <button
              className="button"
              disabled={isSubmitting}
              onClick={() => onMove(task._id)}
            >
              <ion-icon name="arrow-forward-outline"></ion-icon> Move task
            </button>
            <button
              className="button danger"
              disabled={isSubmitting}
              onClick={() => onDelete(task._id)}
            >
              {isSubmitting ? (
                <>
                  <Loader isMini /> Delete task
                </>
              ) : (
                <>
                  <ion-icon name="trash"></ion-icon> Delete task
                </>
              )}
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
