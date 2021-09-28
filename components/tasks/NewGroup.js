import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { addTaskGroup } from "../../features/tasks/tasksSlice";

import Loader from "../ui/Loader";

const NewGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const titleInputRef = useRef();

  function toggleForm() {
    setShowForm((val) => !val);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const taskGroupTitle = titleInputRef.current.value;
    const taskGroupData = {
      title: taskGroupTitle,
    };

    try {
      setIsSubmitting(true);
      await dispatch(addTaskGroup(taskGroupData)).unwrap();
    } catch (error) {
      console.error("Failed to save new group: ", error);
    } finally {
      setIsSubmitting(false);
      setShowForm((val) => !val);
    }
  }

  return (
    <>
      {isSubmitting && <Loader isBlock />}

      {showForm && !isSubmitting && (
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            className="big"
            onBlur={toggleForm}
            placeholder="Task list title..."
            ref={titleInputRef}
            type="text"
          />
        </form>
      )}

      {!showForm && !isSubmitting && (
        <button className="button column-button" onClick={toggleForm}>
          + Add column
        </button>
      )}
    </>
  );
};

export default NewGroup;
