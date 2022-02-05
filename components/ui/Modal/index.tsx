import React, { useEffect, useRef, useState } from "react";
import "wicg-inert";

import styles from "./Modal.module.css";
import Portal from "components/utils/Portal";
import CloseIcon from "components/icons/CloseIcon";

const modalSizes = {
  small: "20rem",
  medium: "36rem",
  large: "60rem",
};

function Header({ children, onClose }: { children: React.ReactNode; onClose: () => void | null }) {
  return (
    <div className={styles.modalHeader}>
      <h2>{children}</h2>
      {onClose && (
        <button className="button icon round" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className={styles.modalBody}>{children}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className={styles.modalFooter}>{children}</div>;
}

type Props = {
  children: React.ReactNode;
  isLocked?: boolean;
  isOpen: boolean;
  onAppear: () => void;
  onClose: () => void;
  size: "small" | "medium" | "large";
};

/**
 * A modal component. `children` can be accepted as is or be wrapped in `<Modal.Header>`, `<Modal.Body>` and `<Modal.Footer>`.
 *
 * @param props.children Child elements to display in the modal
 * @param props.isLocked Locks modal in place (cannot close) until the boolean is flipped (closing via dedicated "close" button)
 * @param props.isOpen Whether modal should be open or not
 * @param props.onAppear Callback function that triggers after the modal becomes active (displayed on the screen)
 * @param props.onClose Function to close the modal
 * @param props.size Size (width) of modal. One of "small", "medium", "large"
 */
function Modal({
  children,
  isLocked = false,
  isOpen = false,
  onAppear = () => {},
  onClose = () => {},
  size = "medium",
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = backdrop;

    const onTransitionEnd = () => {
      onAppear();
      setIsActive(isOpen);
    };

    const handleKey = (e: any) => !isLocked && [27].indexOf(e.which) >= 0 && onClose();

    const handleClick = (e: any) => !isLocked && e.target === current && onClose();

    if (current) {
      current.addEventListener("transitionend", onTransitionEnd);
      current.addEventListener("click", handleClick);
      window.addEventListener("keyup", handleKey);
    }

    if (isOpen) {
      window.setTimeout(() => {
        setIsActive(isOpen);
      }, 10);

      // block user from tabbing around in the background
      document?.querySelector("#__next")?.setAttribute("inert", "true");
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", onTransitionEnd);
        current.removeEventListener("click", handleClick);
      }

      document.querySelector("#__next")!.removeAttribute("inert");
      window.removeEventListener("keyup", handleKey);
    };
  }, [isOpen, isLocked, onAppear, onClose]);

  return (
    <>
      {(isOpen || isActive) && (
        <Portal className="modal-portal">
          <div
            ref={backdrop}
            className={`${styles.backdrop}${isActive && isOpen ? ` ${styles.active}` : ""}`}
          >
            <div className={styles.modal} style={{ maxWidth: modalSizes[size] }}>
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
