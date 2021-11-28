import React, { useEffect, useRef, useState } from "react";
import "wicg-inert";

import styles from "./Modal.module.css";
import Portal from "@components/utils/Portal";

const modalSizes = {
  small: "20rem",
  medium: "36rem",
  large: "58rem",
};

function Header({ children, onClose = null }) {
  return (
    <div className={styles.modalHeader}>
      <h2>{children}</h2>
      {onClose && (
        <button className="button icon round" onClick={onClose}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
      )}
    </div>
  );
}

function Body({ children }) {
  return <div className={styles.modalBody}>{children}</div>;
}

function Footer({ children }) {
  return <div className={styles.modalFooter}>{children}</div>;
}

/**
 * A modal component. `children` can be accepted as is or be wrapped in `<Modal.Header>`, `<Modal.Body>` and `<Modal.Footer>`.
 *
 * @param {Object} props
 * @param {React.node} props.children Child elements to display in the modal.
 * @param {boolean} props.isLocked Locks modal in place (cannot close) until the boolean is flipped.
 * @param {boolean} props.isOpen Whether modal should be open or not.
 * @param {Function} props.onAppear Callback function that triggers after the modal becomes active (displayed on the screen).
 * @param {Function} props.onClose Function to close the modal.
 * @param {string} props.size Size (width) of modal. One of "small", "medium", "large".
 */
function Modal({
  children,
  isLocked = false,
  isOpen = false,
  onAppear = () => {},
  onClose = () => {},
  size = "medium",
}) {
  const [isActive, setIsActive] = useState(false);
  const backdrop = useRef(null);

  useEffect(() => {
    const { current } = backdrop;

    const transitionEnd = () => {
      onAppear();
      setIsActive(isOpen);
    };

    const keyHandler = (e) =>
      !isLocked && [27].indexOf(e.which) >= 0 && onClose();

    const clickHandler = (e) => !isLocked && e.target === current && onClose();

    if (current) {
      current.addEventListener("transitionend", transitionEnd);
      current.addEventListener("click", clickHandler);
      window.addEventListener("keyup", keyHandler);
    }

    if (isOpen) {
      window.setTimeout(() => {
        document.activeElement.blur();
        setIsActive(isOpen);
      }, 10);

      // block user from tabbing around in the background
      document.querySelector("#__next").setAttribute("inert", "true");
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd);
        current.removeEventListener("click", clickHandler);
      }

      document.querySelector("#__next").removeAttribute("inert");
      window.removeEventListener("keyup", keyHandler);
    };
  }, [isOpen, isLocked, onAppear, onClose]);

  return (
    <>
      {(isOpen || isActive) && (
        <Portal className="modal-portal">
          <div
            ref={backdrop}
            className={`${styles.backdrop}${
              isActive && isOpen ? ` ${styles.active}` : ""
            }`}
          >
            <div
              className={styles.modal}
              style={{ maxWidth: modalSizes[size] }}
            >
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
