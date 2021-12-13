import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { addTask, updateTask, selectTask } from "features/tasks/tasksSlice";

import Modal from "components/ui/Modal";
import Loader from "components/ui/Loader";

type Props = {
  isOpen: boolean;
  onClose: (val: boolean) => void;
  groupId: string;
  taskId: string | undefined;
};

const TaskModal = ({ isOpen = false, onClose = () => {}, groupId, taskId = undefined }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useAppSelector(selectTask(groupId, taskId));
  const dispatch = useAppDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const bodyInputRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskTitle = titleInputRef.current?.value;
    const taskBody = bodyInputRef.current?.value;

    const taskData = {
      title: taskTitle || "",
      body: taskBody || "",
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
      <Modal.Header onClose={() => onClose(false)}>{task ? "Edit task" : "Add task"}</Modal.Header>
      <Modal.Body>
        <form id="task-form" onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              className="input"
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
              className="input big h-24"
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
        {isSubmitting && <Loader className="ml-2" />}
        <button className="button primary ml-2" disabled={isSubmitting} form="task-form">
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;