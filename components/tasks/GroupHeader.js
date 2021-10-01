import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { removeTaskGroup, updateTaskGroup } from "@features/tasks/tasksSlice";

import Dropdown from "@components/ui/Dropdown";
import Loader from "@components/ui/Loader";

export default function GroupHeader({ groupId = "", title = "" }) {
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
      _id: groupId,
      title: taskGroupTitle,
    };

    try {
      setIsSubmitting(true);
      await dispatch(updateTaskGroup(taskGroupData)).unwrap();
    } catch (error) {
      console.error("Failed to save new group:", error);
    } finally {
      setIsSubmitting(false);
      setShowForm((val) => !val);
    }
  }

  async function handleDeleteTaskGroup() {
    try {
      setIsSubmitting(true);
      await dispatch(removeTaskGroup(groupId)).unwrap();
    } catch (error) {
      console.error("Failed to delete task group:", error);
    }
  }

  return (
    <div className="card-group-header">
      {isSubmitting && <Loader />}

      {!showForm && (
        <div className="card-group-title">
          <ion-icon name="swap-horizontal"></ion-icon>
          <span className="title" onClick={toggleForm}>
            {title}
          </span>
        </div>
      )}
      {showForm && !isSubmitting && (
        <form className="card-group-form" onSubmit={submitHandler}>
          <input
            autoFocus
            className=""
            defaultValue={title}
            onBlur={toggleForm}
            placeholder="Task list title..."
            ref={titleInputRef}
            type="text"
          />
        </form>
      )}

      <Dropdown
        className="button icon round"
        position="bottom"
        toggleContent={<ion-icon name="ellipsis-vertical"></ion-icon>}
      >
        <Dropdown.List>
          <button
            className="button"
            disabled={isSubmitting}
            onClick={toggleForm}
          >
            <ion-icon name="create-outline"></ion-icon> Edit column
          </button>
          <button
            className="button danger"
            disabled={isSubmitting}
            onClick={handleDeleteTaskGroup}
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
  );
}
