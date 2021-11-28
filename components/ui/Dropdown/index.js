import { useRef } from "react";

import { useClickOutside } from "@components/utils/hooks";
import styles from "./dropdown.module.css";

function DdList({ children }) {
  return (
    <ul>
      {children.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
}

function Dropdown({
  children,
  className = "",
  position = "bottom",
  toggleContent = <ion-icon name="ellipsis-horizontal"></ion-icon>,
}) {
  const dropdownRef = useRef();
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false);

  const classNames = className ? className.split(" ") : [];
  const ddMenuPosition = {
    bottom: { right: "0", top: "calc(100% + 0.5rem)" },
    right: { left: "calc(100% + 0.5rem)", top: 0 },
  };

  const clickHandler = () => setIsActive(!isActive);

  return (
    <div className={styles.ddContainer}>
      <button
        className={[styles.ddTrigger, ...classNames].join(" ")}
        onClick={clickHandler}
      >
        {toggleContent}
      </button>

      <nav
        className={`${styles.ddMenu}${isActive ? ` ${styles.active}` : ""}`}
        ref={dropdownRef}
        style={ddMenuPosition[position]}
      >
        {children}
      </nav>
    </div>
  );
}

Dropdown.List = DdList;

export default Dropdown;
