import { useRef } from "react";

import Card from "components/ui/Card";
import Dropdown from "components/ui/Dropdown";
import DraggableIcon from "components/icons/DraggableIcon";
import EditIcon from "components/icons/EditIcon";
import TrashIcon from "components/icons/TrashIcon";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import LoaderIcon from "components/icons/LoaderIcon";

function ListHeader({
  name = "",
  position,
  showForm = false,
  isProcessing = false,
  isSubmitting = false,
  isDeleting = false,
  nextListExists = false,
  toggleForm = () => {},
  onUpdate = () => {},
  onMove = () => {},
  onDelete = () => {},
}: {
  name: string;
  position: number;
  showForm: boolean;
  isProcessing: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  nextListExists: boolean;
  toggleForm: () => void;
  onUpdate: ({ name }: { name: string }) => void;
  onMove: (newPosition: number) => void;
  onDelete: () => void;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const listName = nameInputRef.current?.value;
    const data = {
      name: listName || "",
    };

    onUpdate(data);
  }

  return (
    <Card.Header>
      {isSubmitting && <LoaderIcon className="loader" />}

      {!showForm && (
        <Card.HeaderTitle>
          <DraggableIcon />
          <span className="cursor-pointer font-medium" onClick={toggleForm}>
            {name}
          </span>
        </Card.HeaderTitle>
      )}
      {showForm && !isSubmitting && (
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            className="input"
            defaultValue={name}
            onBlur={toggleForm}
            placeholder="Card list name..."
            ref={nameInputRef}
            type="text"
          />
        </form>
      )}

      <Dropdown className="button icon round">
        <Dropdown.List>
          <button disabled={isProcessing} onClick={toggleForm}>
            <EditIcon size={18} /> Edit list
          </button>
          <button disabled={isProcessing || !nextListExists} onClick={() => onMove(position + 1)}>
            <ArrowRightIcon size={18} /> Move forward
          </button>
          <button disabled={isProcessing || position === 1} onClick={() => onMove(position - 1)}>
            <ArrowLeftIcon size={18} /> Move backwards
          </button>
          <button
            className="text-red-500 disabled:text-red-300"
            disabled={isProcessing}
            onClick={onDelete}
          >
            {isDeleting ? (
              <>
                <LoaderIcon className="loader" size={18} /> Delete list
              </>
            ) : (
              <>
                <TrashIcon size={18} /> Delete list
              </>
            )}
          </button>
        </Dropdown.List>
      </Dropdown>
    </Card.Header>
  );
}

export default ListHeader;
