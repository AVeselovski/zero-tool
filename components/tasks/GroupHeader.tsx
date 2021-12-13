import { useRef, useState } from "react";

import { useAppDispatch } from "app/hooks";
import { removeTaskGroup, updateTaskGroup } from "features/tasks/tasksSlice";

import Card from "components/ui/Card";
import Dropdown from "components/ui/Dropdown";
import Loader from "components/ui/Loader";
import DraggableIcon from "components/icons/DraggableIcon";
import EditIcon from "components/icons/EditIcon";
import TrashIcon from "components/icons/TrashIcon";

export default function GroupHeader({ groupId = "", title = "" }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const titleInputRef = useRef<HTMLInputElement>(null);

  function toggleForm() {
    setShowForm((val) => !val);
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const taskGroupTitle = titleInputRef.current?.value;
    const taskGroupData = {
      _id: groupId,
      title: taskGroupTitle || "",
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
            placeholder="Card list title..."
            ref={titleInputRef}
            type="text"
          />
        </form>
      )}

      <Dropdown className="button icon round">
        <Dropdown.List>
          <button disabled={isSubmitting || isDeleting} onClick={toggleForm}>
            <EditIcon size={18} /> Edit column
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
                <TrashIcon size={18} /> Delete column
              </>
            )}
          </button>
        </Dropdown.List>
      </Dropdown>
    </Card.Header>
  );
}
