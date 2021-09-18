import { useRouter } from "next/router";
import { useRef, useState } from "react";

import api from "../utils/api";
import { useStore } from "../utils/store";

import Modal from "./ui/Modal";
import Loader from "./ui/Loader";

const TaskModal = ({
  isOpen = false,
  onClose = () => {},
  taskGroupId = "",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useStore();

  const router = useRouter();

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

    setIsSubmitting(true);

    const { data, error } = await api(
      `/projects/${router.query.projectId}/${taskGroupId}`,
      "POST",
      taskData
    );

    setIsSubmitting(false);

    if (error) {
      // TODO: handle error dispatch
      console.group("ERROR:", error);
    } else {
      /** (?) How to handle "actions" with side effects (e.g. "GET_TASKS") */
      dispatch({ type: "ADD_TASK", task: data, taskGroupId });
      /** (?) */

      onClose(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose(false);
      }}
      size="medium"
    >
      <Modal.Header onClose={() => onClose(false)}>Add task</Modal.Header>
      <Modal.Body>
        <form id="task-form" onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
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
