import { useRef, useState } from "react";

import { useAppSelector } from "app/hooks";
import { usePostListMutation } from "app/services/zeroApi";
import { selectProjectId } from "features/project/projectSlice";

import LoaderIcon from "components/icons/LoaderIcon";

const NewList = () => {
  const [showForm, setShowForm] = useState(false);

  const projectId = useAppSelector(selectProjectId);

  const [postList, { isLoading }] = usePostListMutation();

  const nameInputRef = useRef<HTMLInputElement>(null);

  function toggleForm() {
    setShowForm((val) => !val);
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const listName = nameInputRef.current?.value;
    const data = {
      name: listName || "",
    };

    try {
      await postList({ projectId: projectId!, data }).unwrap();
      setShowForm((val) => !val);
    } catch (error) {
      console.error("Failed to save new list:", error);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-10 text-center">
          <LoaderIcon className="loader" />
        </div>
      )}

      {showForm && !isLoading && (
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            className="input big"
            onBlur={toggleForm}
            placeholder="Card list name..."
            ref={nameInputRef}
            type="text"
          />
        </form>
      )}

      {!showForm && !isLoading && (
        <button className="button round sticky top-0" onClick={toggleForm}>
          + Add list
        </button>
      )}
    </>
  );
};

export default NewList;
