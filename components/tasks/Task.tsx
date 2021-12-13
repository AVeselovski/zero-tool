import React from "react";

import Dropdown from "components/ui/Dropdown";
import Loader from "components/ui/Loader";
import Card from "components/ui/Card";
import DraggableIcon from "components/icons/DraggableIcon";
import EllipsisVIcon from "components/icons/EllipsisVIcon";
import EditIcon from "components/icons/EditIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import TrashIcon from "components/icons/TrashIcon";

import type { ITask } from "../../types";

type Props = {
  task: ITask;
  isSubmitting: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onMove: (id: string) => void;
};

const Task = ({
  task,
  isSubmitting = false,
  onDelete = () => {},
  onEdit = () => {},
  onMove = () => {},
}: Props) => {
  return (
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <DraggableIcon />
          {task?.title}
        </Card.HeaderTitle>
        <Dropdown className="button icon round ml-1" toggleContent={<EllipsisVIcon />}>
          <Dropdown.List>
            <button disabled={isSubmitting} onClick={() => onEdit(task._id)}>
              <EditIcon size={18} /> Edit card
            </button>
            <button disabled={isSubmitting} onClick={() => onMove(task._id)}>
              <ArrowRightIcon size={18} /> Move card
            </button>
            <button
              className="text-red-500"
              disabled={isSubmitting}
              onClick={() => onDelete(task._id)}
            >
              {isSubmitting ? <Loader isMini /> : <TrashIcon size={18} />} Delete card
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
