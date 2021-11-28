import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { removeTaskGroup, updateTaskGroup } from "@features/tasks/tasksSlice";

import styles from "../ui/Card/Card.module.css";
import Card from "@components/ui/Card";
import Dropdown from "@components/ui/Dropdown";
import Loader from "@components/ui/Loader";
import DraggableIcon from "@components/icons/DraggableIcon";

export default function GroupHeader({ groupId = "", title = "" }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      setIsDeleting(true);
      await dispatch(removeTaskGroup(groupId)).unwrap();
    } catch (error) {
      console.error("Failed to delete task group:", error);
    }
  }

  return (
    <Card.Header>
      {isSubmitting && <Loader />}

      {!showForm && (
        <Card.HeaderTitle>
          <DraggableIcon />
          <strong className="cursor-pointer" onClick={toggleForm}>
            {title}
          </strong>
        </Card.HeaderTitle>
      )}
      {showForm && !isSubmitting && (
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            className="input"
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
          <button disabled={isSubmitting || isDeleting} onClick={toggleForm}>
            <ion-icon name="create-outline"></ion-icon> Edit column
          </button>
          <button
            className="text-red-500"
            disabled={isSubmitting || isDeleting}
            onClick={handleDeleteTaskGroup}
          >
            {isSubmitting || isDeleting ? (
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
    </Card.Header>
  );
}
