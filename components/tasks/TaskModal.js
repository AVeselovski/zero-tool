import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, updateTask, selectTask } from "@features/tasks/tasksSlice";

import Modal from "@components/ui/Modal";
import Loader from "@components/ui/Loader";

const TaskModal = ({
  isOpen = false,
  onClose = () => {},
  groupId = null,
  taskId = null,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector(selectTask(groupId, taskId));
  const dispatch = useDispatch();

  const titleInputRef = useRef();
  const bodyInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const taskTitle = titleInputRef.current.value;
    const taskBody = bodyInputRef.current.value;

    const taskData = {
      title: taskTitle,
      body: taskBody,
    };

    try {
      setIsSubmitting(true);
      task?._id
        ? await dispatch(updateTask({ ...task, ...taskData })).unwrap()
        : await dispatch(addTask({ groupId, task: taskData })).unwrap();
    } catch (error) {
      console.error("Failed to save new task:", error);
    } finally {
      setIsSubmitting(false);
      onClose(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAppear={() => titleInputRef?.current?.focus()}
      onClose={() => {
        onClose(false);
      }}
      size="medium"
    >
      <Modal.Header onClose={() => onClose(false)}>
        {task ? "Edit task" : "Add task"}
      </Modal.Header>
      <Modal.Body>
        <form id="task-form" onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              defaultValue={task ? task.title : ""}
              disabled={isSubmitting}
              id="title"
              ref={titleInputRef}
              required
              type="text"
            />
          </div>
          <div className="input-group">
            <label htmlFor="body">Body</label>
            <textarea
              defaultValue={task ? task.body : ""}
              disabled={isSubmitting}
              id="body"
              ref={bodyInputRef}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="button"
          onClick={() => {
            onClose(false);
          }}
        >
          Close
        </button>
        {isSubmitting && <Loader className="ml-2/4" />}
        <button
          className="button primary ml-2/4"
          disabled={isSubmitting}
          form="task-form"
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
