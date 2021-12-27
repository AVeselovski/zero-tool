import React, { useRef } from "react";

import styles from "./Select.module.css";
import { useClickOutside } from "components/utils/hooks";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import ChevronUpIcon from "@components/icons/ChevronUpIcon";
import CheckIcon from "@components/icons/CheckIcon";

type Props = {
  children?: React.ReactNode;
  className?: string;
  list: { label: string; value: string }[] | [];
  onSelect: (val: string) => void;
  selected: { label: string; value: string };
};

function Select({ children, className = "", list = [], onSelect = () => {}, selected }: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false);

  const classNames = className.split(" ");

  function handleClick() {
    setIsActive((prevState) => !prevState);
  }

  function handleItemClick(item: string) {
    onSelect(item);
    setIsActive((prevState) => !prevState);
  }

  return (
    <div className={styles.selectContainer}>
      <div className={[styles.selectTrigger, ...classNames].join(" ")} onClick={handleClick}>
        {selected?.label || "..."}{" "}
        {isActive ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
      </div>

      <ul
        className={`${styles.selectList}${isActive ? ` ${styles.isActive}` : ""}`}
        ref={dropdownRef}
      >
        {list.map((item) => (
          <li key={item.value}>
            <button
              className={item.value === selected.value ? styles.isSelected : ""}
              disabled={item.value === selected.value}
              onClick={handleItemClick.bind(null, item.value)}
            >
              {item.value === selected.value && <CheckIcon size={18} />}
              {item.label}
            </button>
          </li>
        ))}

        {/* TODO: Alternative way providing list items to allow custom content

          {Array.isArray(children) ? (
            children.map((child, i) => <li key={i}>{child}</li>)
          ) : (
            <li>{children}</li>
          )} 

        */}
      </ul>
    </div>
  );
}

export default Select;
