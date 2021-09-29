import { useState } from "react";
import { useDispatch } from "react-redux";

import { removeTask } from "../../features/tasks/tasksSlice";

import GroupHeader from "./GroupHeader";
import Task from "./Task";
import TaskModal from "./TaskModal";

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
        <GroupHeader groupId={group._id} title={group.title} />

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
