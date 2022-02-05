import { useState } from "react";

import { useAppSelector } from "app/hooks";
import {
  usePatchListMutation,
  useMoveListMutation,
  useDeleteListMutation,
  useMoveCardMutation,
  useDeleteCardMutation,
} from "app/services/zeroApi";
import { selectProjectId, selectListByPosition } from "features/project/projectSlice";

import CardComponent from "components/ui/Card";
import ListHeader from "./components/ListHeader";
import Card from "./components/Card";
import CardModal from "./CardModal";

import type { IList } from "types";

const List = ({ list }: { list: IList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showListForm, setShowListForm] = useState(false);
  const [editableCardId, setEditableCardId] = useState<number | undefined>(undefined);

  const projectId = useAppSelector(selectProjectId);
  const prevList = useAppSelector(selectListByPosition(list.position - 1));
  const nextList = useAppSelector(selectListByPosition(list.position + 1));

  const [patchList, { isLoading: isSubmittingList }] = usePatchListMutation();
  const [moveList, { isLoading: isMovingList }] = useMoveListMutation();
  const [deleteList, { isLoading: isDeletingList }] = useDeleteListMutation();

  const [moveCard, { isLoading: isMovingCard }] = useMoveCardMutation();
  const [deleteCard, { isLoading: isDeletingCard }] = useDeleteCardMutation();

  const isProcessingList = isSubmittingList || isMovingList || isDeletingList;
  const isProcessingCard = isDeletingCard || isMovingCard;

  function toggleListForm() {
    setShowListForm((val) => !val);
  }

  function onModalClose() {
    setIsOpen(false);
    setEditableCardId(undefined);
  }

  function onCardEdit(id: number) {
    setEditableCardId(id);
    setIsOpen(true);
  }

  async function handleUpdateList(data: { name: string }) {
    try {
      await patchList({ projectId: projectId!, listId: list.id, data }).unwrap();
      setShowListForm((val) => !val);
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  }

  async function handleMoveList(newPosition: number) {
    const data = {
      position: newPosition,
    };

    try {
      await moveList({ projectId: projectId!, listId: list.id, data }).unwrap();
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  }

  async function handleDeleteList() {
    try {
      await deleteList({ projectId: projectId!, listId: list.id }).unwrap();
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  }

  async function handleMoveCard(id: number, target: "previous" | "next") {
    const targetListId = target === "next" ? nextList?.id : prevList?.id;
    const listLength = target === "next" ? nextList?.cards.length : prevList?.cards.length;
    const data = {
      listId: targetListId as number,
      position: (listLength as number) + 1,
    };

    try {
      await moveCard({ projectId: projectId!, listId: list.id, cardId: id, data }).unwrap();
    } catch (error) {
      console.error("Failed to update card position:", error);
    }
  }

  async function handleDeleteCard(id: number) {
    try {
      await deleteCard({ projectId: projectId!, listId: list.id, cardId: id }).unwrap();
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  }

  return (
    <>
      <CardComponent className="mb-0" isList>
        <ListHeader
          name={list.name}
          position={list.position}
          showForm={showListForm}
          isProcessing={isProcessingList}
          isSubmitting={isSubmittingList}
          isDeleting={isDeletingList}
          nextListExists={!!nextList}
          toggleForm={toggleListForm}
          onUpdate={handleUpdateList}
          onMove={handleMoveList}
          onDelete={handleDeleteList}
        />

        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isProcessing={isProcessingCard}
            isDeleting={isDeletingCard}
            prevListExists={!!prevList}
            nextListExists={!!nextList}
            onEdit={onCardEdit}
            onDelete={handleDeleteCard}
            onMove={handleMoveCard}
          />
        ))}

        <button className="button round w-full h-10 sticky top-0" onClick={() => setIsOpen(true)}>
          + Add card
        </button>
      </CardComponent>

      <CardModal isOpen={isOpen} onClose={onModalClose} listId={list.id} cardId={editableCardId} />
    </>
  );
};

export default List;
