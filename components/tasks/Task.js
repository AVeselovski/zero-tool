import React from "react";

import Dropdown from "@components/ui/Dropdown";
import Loader from "@components/ui/Loader";
import Card from "@components/ui/Card";
import DraggableIcon from "@components/icons/DraggableIcon";
import EllipsisIcon from "@components/icons/EllipsisIcon";
import EditIcon from "@components/icons/EditIcon";
import ArrowRightIcon from "@components/icons/ArrowRightIcon";
import TrashIcon from "@components/icons/TrashIcon";

const Task = ({
  task,
  isSubmitting = false,
  onDelete = () => {},
  onEdit = () => {},
  onMove = () => {},
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <DraggableIcon />
          {task?.title}
        </Card.HeaderTitle>
        <Dropdown
          className="button icon round ml-1"
          toggleContent={<EllipsisIcon />}
        >
          <Dropdown.List>
            <button disabled={isSubmitting} onClick={() => onEdit(task._id)}>
              <EditIcon size={16} /> Edit card
            </button>
            <button disabled={isSubmitting} onClick={() => onMove(task._id)}>
              <ArrowRightIcon size={16} /> Move card
            </button>
            <button
              className="text-red-500"
              disabled={isSubmitting}
              onClick={() => onDelete(task._id)}
            >
              {isSubmitting ? <Loader isMini /> : <TrashIcon size={16} />}{" "}
              Delete card
            </button>
          </Dropdown.List>
        </Dropdown>
      </Card.Header>
      <Card.Body>{task?.body}</Card.Body>
      <Card.Footer>#some tag</Card.Footer>
    </Card>
  );
};

export default Task;
