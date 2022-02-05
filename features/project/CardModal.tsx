import { useRef } from "react";

import { useAppSelector } from "app/hooks";
import { usePostCardMutation, usePatchCardMutation } from "app/services/zeroApi";
import { selectProjectId, selectCard } from "@features/project/projectSlice";

import Modal from "components/ui/Modal";
import LoaderIcon from "components/icons/LoaderIcon";

type Props = {
  isOpen: boolean;
  onClose: (val: boolean) => void;
  listId: number;
  cardId: number | undefined;
};

const CardModal = ({ isOpen = false, onClose = () => {}, listId, cardId = undefined }: Props) => {
  const projectId = useAppSelector(selectProjectId);
  const card = useAppSelector(selectCard(listId, cardId));

  const isEditing = !!card;

  const [postCard, { isLoading: isPostingCard }] = usePostCardMutation();
  const [patchCard, { isLoading: isPatchingCard }] = usePatchCardMutation();

  const isSubmitting = isPostingCard || isPatchingCard;

  const nameInputRef = useRef<HTMLInputElement>(null);
  const bodyInputRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardName = nameInputRef.current?.value;
    const cardBody = bodyInputRef.current?.value;
    const data = {
      name: cardName || "",
      body: cardBody || "",
    };

    try {
      card?.id
        ? await patchCard({ projectId: projectId!, listId, cardId: card.id, data }).unwrap()
        : await postCard({ projectId: projectId!, listId, data }).unwrap();
      onClose(false);
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAppear={() => !isEditing && nameInputRef?.current?.focus()}
      onClose={() => {
        onClose(false);
      }}
      size="medium"
    >
      <Modal.Header onClose={() => onClose(false)}>
        {isEditing ? "Edit card" : "Add card"}
      </Modal.Header>
      <Modal.Body>
        <form id="task-form" onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="name">Card title</label>
            <input
              className="input big"
              defaultValue={card?.name || ""}
              disabled={isSubmitting}
              id="name"
              ref={nameInputRef}
              required
              type="text"
            />
          </div>
          <div className="input-group">
            <label htmlFor="body">Card body</label>
            <textarea
              className="input big min-h-[160px]"
              defaultValue={card?.body || ""}
              disabled={isSubmitting}
              id="body"
              ref={bodyInputRef}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {isSubmitting && <LoaderIcon className="loader" />}
        <button className="button primary ml-4" disabled={isSubmitting} form="task-form">
          Save
        </button>
        <button
          className="button ml-2"
          onClick={() => {
            onClose(false);
          }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
