import { useEffect, useRef, useState } from "react";

import styles from "./modal.module.scss";
import Portal from "../../utils/Portal";

const modalSizes = {
  small: "20rem",
  medium: "36rem",
  large: "58rem",
};

function Header({ children, onClose = null }) {
  return (
    <div className={styles.modalHeader}>
      <div>{children}</div>
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

function Modal({
  children,
  isLocked = false,
  isOpen,
  onClose,
  size = "medium",
}) {
  const [isActive, setIsActive] = useState(false);
  const backdrop = useRef(null);

  useEffect(() => {
    const { current } = backdrop;

    const transitionEnd = () => setIsActive(isOpen);

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
        // document.querySelector("#root").setAttribute("inert", "true");
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd);
        current.removeEventListener("click", clickHandler);
      }

      // document.querySelector("#root").removeAttribute("inert");
      window.removeEventListener("keyup", keyHandler);
    };
  }, [isOpen, isLocked, onClose]);

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
