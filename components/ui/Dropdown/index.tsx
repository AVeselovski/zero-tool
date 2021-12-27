import { useRef } from "react";

import styles from "./Dropdown.module.css";
import { useClickOutside } from "components/utils/hooks";
import EllipsisHIcon from "components/icons/EllipsisHIcon";

function DdList({ children }: { children: React.ReactNode }) {
  return (
    <ul>
      {Array.isArray(children) ? (
        children.map((child, i) => <li key={i}>{child}</li>)
      ) : (
        <li>{children}</li>
      )}
    </ul>
  );
}

type Props = {
  children: React.ReactNode;
  className: string;
  position?: "bottom" | "right";
  toggleContent?: React.ReactNode;
};

function Dropdown({
  children,
  className = "",
  position = "bottom",
  toggleContent = <EllipsisHIcon />,
}: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false);

  const classNames = className.split(" ");
  const ddMenuPosition = {
    bottom: { right: "0", top: "calc(100% + 0.5rem)" },
    right: { left: "calc(100% + 0.5rem)", top: 0 },
  };

  function handleClick() {
    setIsActive((prevState) => !prevState);
  }

  return (
    <div className={styles.ddContainer}>
      <button className={[styles.ddTrigger, ...classNames].join(" ")} onClick={handleClick}>
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
