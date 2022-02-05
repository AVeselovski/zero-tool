import React from "react";

import Dropdown from "components/ui/Dropdown";
import CardComponent from "components/ui/Card";
import DraggableIcon from "components/icons/DraggableIcon";
import EllipsisVIcon from "components/icons/EllipsisVIcon";
import EditIcon from "components/icons/EditIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import TrashIcon from "components/icons/TrashIcon";
import LoaderIcon from "components/icons/LoaderIcon";

import type { ICard } from "../../../types";

type Props = {
  card: ICard;
  isProcessing: boolean;
  isDeleting: boolean;
  prevListExists: boolean;
  nextListExists: boolean;
  onEdit: (id: number) => void;
  onMove: (id: number, target: "previous" | "next") => void;
  onDelete: (id: number) => void;
};

const Card = ({
  card,
  isProcessing = false,
  isDeleting = false,
  prevListExists = false,
  nextListExists = false,
  onEdit = () => {},
  onMove = () => {},
  onDelete = () => {},
}: Props) => {
  return (
    <CardComponent>
      <CardComponent.Header>
        <CardComponent.HeaderTitle>
          <DraggableIcon />
          {card?.name}
        </CardComponent.HeaderTitle>
        <Dropdown className="button icon round ml-1" toggleContent={<EllipsisVIcon />}>
          <Dropdown.List>
            <button disabled={isProcessing} onClick={() => onEdit(card.id)}>
              <EditIcon size={18} /> Edit card
            </button>
            <button
              disabled={isProcessing || !nextListExists}
              onClick={() => onMove(card.id, "next")}
            >
              <ArrowRightIcon size={18} /> Move forward
            </button>
            <button
              disabled={isProcessing || !prevListExists}
              onClick={() => onMove(card.id, "previous")}
            >
              <ArrowLeftIcon size={18} /> Move backwards
            </button>
            <button
              className="text-red-500 disabled:text-red-300"
              disabled={isProcessing}
              onClick={() => onDelete(card.id)}
            >
              {isDeleting ? <LoaderIcon className="loader" size={18} /> : <TrashIcon size={18} />}{" "}
              Delete card
            </button>
          </Dropdown.List>
        </Dropdown>
      </CardComponent.Header>
      <CardComponent.Body>{card?.body}</CardComponent.Body>
      <CardComponent.Footer>#some tag</CardComponent.Footer>
    </CardComponent>
  );
};

export default Card;
