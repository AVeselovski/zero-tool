import { useRouter } from "next/router";
import { useState } from "react";

import api from "../utils/api";
import { useStore } from "../utils/store";

import Task from "./Task";
import TaskModal from "./TaskModal";
import Dropdown from "./ui/Dropdown";

const TaskGroup = ({ taskGroup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useStore();

  const router = useRouter();

  async function deleteTaskGroupHandler(id) {
    const { data, error } = await api(
      `/projects/${router.query.projectId}/${id}`,
      "DELETE"
    );

    if (error) {
      // TODO: handle error dispatch
      console.group("ERROR:", error);
    } else {
      /** (?) How to handle "actions" with side effects (e.g. "GET_TASKS") */
      dispatch({ type: "REMOVE_TASK_GROUP", taskGroupId: id });
      /** (?) */
    }
  }

  async function deleteTaskHandler(id) {
    const { data, error } = await api(
      `/projects/${router.query.projectId}/${taskGroup._id}/${id}`,
      "DELETE"
    );

    if (error) {
      // TODO: handle error dispatch
      console.group("ERROR:", error);
    } else {
      /** (?) How to handle "actions" with side effects (e.g. "GET_TASKS") */
      dispatch({ type: "REMOVE_TASK", taskId: id, taskGroupId: taskGroup._id });
      /** (?) */
    }
  }

  return (
    <>
      <div className="card-group">
        <div className="card-group-header">
          <div className="card-group-title">
            <ion-icon name="swap-horizontal"></ion-icon>
            {taskGroup.title}
          </div>
          <Dropdown
            className="button icon round"
            position="right"
            toggleContent={<ion-icon name="ellipsis-horizontal"></ion-icon>}
          >
            <Dropdown.List>
              <button>
                <ion-icon name="create-outline"></ion-icon> Edit column
              </button>
              <button
                className="danger"
                onClick={() => deleteTaskGroupHandler(taskGroup._id)}
              >
                <ion-icon name="trash"></ion-icon> Delete column
              </button>
            </Dropdown.List>
          </Dropdown>
        </div>
        <div>
          {taskGroup.tasks.map((task) => (
            <Task key={task._id} task={task} onDelete={deleteTaskHandler} />
          ))}
          <button
            className="button column-button"
            onClick={() => setIsOpen(true)}
          >
            + Add task
          </button>
        </div>
      </div>

      <TaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        taskGroupId={taskGroup._id}
      />
    </>
  );
};

export default TaskGroup;
