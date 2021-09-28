import { useState } from "react";
import { useDispatch } from "react-redux";

import { removeTaskGroup, removeTask } from "../../features/tasks/tasksSlice";

import Task from "./Task";
import TaskModal from "./TaskModal";
import Dropdown from "../ui/Dropdown";
import Loader from "../ui/Loader";

const TaskGroup = ({ group }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  function onModalClose() {
    setIsOpen(false);
    setEditTaskId(null);
  }

  function onEditTask(id) {
    setEditTaskId(id);
    setIsOpen(true);
  }

  async function handleDeleteTaskGroup(id) {
    try {
      setIsSubmitting(true);
      await dispatch(removeTaskGroup(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete task group: ", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteTask(id) {
    try {
      setIsSubmitting(true);
      await dispatch(removeTask({ groupId: group._id, taskId: id })).unwrap();
    } catch (error) {
      console.error("Failed to delete task: ", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="card-group">
        <div className="card-group-header">
          <div className="card-group-title">
            <ion-icon name="swap-horizontal"></ion-icon>
            {group.title}
          </div>
          <Dropdown
            className="button icon round"
            position="right"
            toggleContent={<ion-icon name="ellipsis-horizontal"></ion-icon>}
          >
            <Dropdown.List>
              <button className="button" disabled={isSubmitting}>
                <ion-icon name="create-outline"></ion-icon> Edit column
              </button>
              <button
                className="button danger"
                disabled={isSubmitting}
                onClick={() => handleDeleteTaskGroup(group._id)}
              >
                {isSubmitting ? (
                  <>
                    <Loader isMini /> Delete column
                  </>
                ) : (
                  <>
                    <ion-icon name="trash"></ion-icon> Delete column
                  </>
                )}
              </button>
            </Dropdown.List>
          </Dropdown>
        </div>
        <div>
          {group.tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              isSubmitting={isSubmitting}
              onDelete={handleDeleteTask}
              onEdit={onEditTask}
            />
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
        onClose={onModalClose}
        groupId={group._id}
        taskId={editTaskId}
      />
    </>
  );
};

export default TaskGroup;
